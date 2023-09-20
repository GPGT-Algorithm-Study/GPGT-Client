import React from 'react';
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
import useFetch from 'hooks/useFetch';
import { getLastComment } from 'api/item';
import { useDispatch } from 'react-redux';
import { setShowRecommendModal, setShowStoreModal } from 'redux/modal';

/**
 * 메인 화면
 */
function Main() {
  const dispatch = useDispatch();
  // 유틸 기능 목록
  const utils = [
    {
      id: 1,
      name: '문제 추천',
      iconUrl: `${process.env.PUBLIC_URL}/recommend_icon.svg`,
      clickListener: () => {
        dispatch(setShowRecommendModal(true));
      },
    },
    {
      id: 2,
      name: '상점',
      iconUrl: `${process.env.PUBLIC_URL}/store_icon.svg`,
      clickListener: () => {
        dispatch(setShowStoreModal(true));
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
  const [message] = useFetch(getLastComment, '');

  return (
    <div>
      <BannerCard>
        <BannerInfo>
          <b>좋은사람 좋은시간</b>
          <br />
          알고리즘 스터디입니다.
        </BannerInfo>
        {!isEmpty(message.notionId) && (
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
      <ContentTitle>공지 사항</ContentTitle>
      <NoticeCard>
        <MessageContent>
          📣 정식 배포를 완료하였습니다! (2023-09-17)
        </MessageContent>
      </NoticeCard>
    </div>
  );
}

export default Main;
