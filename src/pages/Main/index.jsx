import React, { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import {
  BannerCard,
  MessageContent,
  Writer,
  NoticeCard,
  ContentTitle,
  UtilWrapper,
  Util,
  UtilIcon,
  BannerInfo,
} from './style';
import dayjs from 'dayjs';
import { boardType } from 'utils/board';
import { useNavigate } from 'react-router-dom';
import Modal from 'layouts/Modal';
import ProblemRecommend from 'pages/ProblemRecommend';
import Store from 'pages/Store';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import { BRD_PREFIX_URL } from 'utils/constants';

/**
 * 메인 화면
 */
function Main() {
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  // 유틸 기능 목록
  const utils = [
    {
      id: 1,
      name: '문제 추천',
      iconUrl: `${process.env.PUBLIC_URL}/recommend_icon.svg`,
      clickListener: () => {
        setShowRecommendModal(true);
      },
    },
    {
      id: 2,
      name: '상점',
      iconUrl: `${process.env.PUBLIC_URL}/store_icon.svg`,
      clickListener: () => {
        setShowStoreModal(true);
      },
    },
    {
      id: 3,
      name: '노션 페이지',
      iconUrl: `${process.env.PUBLIC_URL}/notion_icon.svg`,
      clickListener: () => {
        window.open('https://www.notion.so/9add51f476244ba180872f35d7a8ce81');
      },
    },
  ];
  const { data: message } = useSWR(`api/v2/boolshit/last`, fetcher);
  const { data: noticeBoard } = useSWR(
    `${BRD_PREFIX_URL}/all/type?type=${
      boardType.NOTICE.key
    }&page=${0}&size=${1}`,
    fetcher,
  );
  const [notice, setNotice] = useState({});

  const onCloseModal = useCallback(() => {
    setShowStoreModal(false);
    setShowRecommendModal(false);
  }, []);

  useEffect(() => {
    if (!noticeBoard) return;
    const { content, totalElements } = noticeBoard;
    if (totalElements > 0) {
      setNotice(content[0]);
    }
  }, [noticeBoard]);

  const navigate = useNavigate();

  return (
    <div>
      <BannerCard>
        <BannerInfo>
          <b>좋은사람 좋은시간</b>
          <br />
          알고리즘 스터디입니다.
        </BannerInfo>
        {message && !isEmpty(message.notionId) && (
          <div>
            <MessageContent>"{message.message}"</MessageContent>
            <Writer>
              {message.notionId} {message.emoji},{' '}
              {dayjs(message.writtenDate).format('YYYY-MM-DD')}
            </Writer>
          </div>
        )}
      </BannerCard>
      <UtilWrapper>
        {utils.map((util) => (
          <Util key={util.id} onClick={util.clickListener}>
            <UtilIcon url={util.iconUrl}></UtilIcon>
            <div> {util.name} </div>
          </Util>
        ))}
      </UtilWrapper>
      {!isEmpty(notice) && (
        <>
          <ContentTitle>공지 사항</ContentTitle>
          <NoticeCard
            onClick={() => {
              navigate(`/board/${notice.id}`);
            }}
          >
            <MessageContent>
              📣 {notice.title} ({dayjs(notice.createTime).format('YYYY-MM-DD')}
              )
            </MessageContent>
          </NoticeCard>
        </>
      )}
      <Modal show={showRecommendModal} onCloseModal={onCloseModal}>
        <ProblemRecommend />
      </Modal>
      <Modal show={showStoreModal} onCloseModal={onCloseModal}>
        <Store />
      </Modal>
    </div>
  );
}

export default Main;
