import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import {
  MessageContent,
  Writer,
  RandomPsDiv,
  Container,
  Message,
  RadomRecommendInput,
  MainTitle,
  NoticeInfo,
} from './style';
import dayjs from 'dayjs';
import { boardType } from 'utils/board';
import { useNavigate } from 'react-router-dom';
import Modal from 'layouts/Modal';
import ProblemRecommend from 'pages/ProblemRecommend';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import { BRD_PREFIX_URL, USER_PREFIX_URL } from 'utils/constants';
import TodayRandomProblem from './TodayRandomProblem';
import { isLoginUser } from 'utils/auth';
import useInput from 'hooks/useInput';
import { toast } from 'react-toastify';

/**
 * 메인 화면
 */
function Main() {
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [notice, setNotice] = useState({});
  const [bojId, onChangeBojId, setBojId] = useInput('');

  const isLogin = useMemo(() => {
    return isLoginUser();
  }, []);

  const { data: loginUser } = useSWR(
    isLogin ? `${USER_PREFIX_URL}/auth/parse/boj` : '',
    fetcher,
  );

  useEffect(() => {
    if (!loginUser || !isLogin) return;
    setBojId(loginUser.claim);
  }, [loginUser, isLogin]);

  const { data: message } = useSWR(
    isLogin ? `api/v2/boolshit/last` : '',
    fetcher,
  );
  const { data: noticeBoard } = useSWR(
    isLogin
      ? `${BRD_PREFIX_URL}/all/type?type=${boardType.NOTICE.key}&page=0&size=1`
      : '',
    fetcher,
  );

  const onCloseModal = useCallback(() => {
    setShowRecommendModal(false);
  }, []);

  useEffect(() => {
    if (!noticeBoard) return;
    const { content, totalElements } = noticeBoard;
    if (totalElements > 0) {
      setNotice(content[0]);
    }
  }, [noticeBoard]);

  const isInPeriod = useCallback((createdDate) => {
    const targetDate = dayjs(createdDate);
    const eightDaysAgo = dayjs().subtract(4, 'day');
    return targetDate.isAfter(eightDaysAgo);
  }, []);

  const navigate = useNavigate();

  return (
    <Container>
      {message && !isEmpty(message.notionId) && (
        <Message>
          <MessageContent>{message.message}</MessageContent>
          <Writer>
            {message.notionId} {message.emoji},{' '}
            {dayjs(message.writtenDate).format('YYYY-MM-DD')}
          </Writer>
        </Message>
      )}
      <MainTitle>🤔 오늘 뭐 풀지?</MainTitle>
      <RandomPsDiv>
        <RadomRecommendInput>
          <input
            placeholder="백준 아이디"
            value={bojId}
            onChange={onChangeBojId}
          />
          <div
            onClick={() => {
              setShowRecommendModal(true);
            }}
          >
            추천 받기
          </div>
        </RadomRecommendInput>
        {isLogin && <TodayRandomProblem />}
        {isLogin && !isEmpty(notice) && isInPeriod(notice.createdDate) && (
          <NoticeInfo
            onClick={() => {
              navigate(`/board/${notice.id}`);
            }}
          >
            <span>new!</span>
            [공지사항] {notice.title}
          </NoticeInfo>
        )}
      </RandomPsDiv>
      <Modal show={showRecommendModal} onCloseModal={onCloseModal}>
        <ProblemRecommend bojId={bojId} />
      </Modal>
    </Container>
  );
}

export default Main;
