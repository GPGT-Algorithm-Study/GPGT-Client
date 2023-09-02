import React, { useCallback, useState } from 'react';
import Header from 'layouts/Header';
import {
  Banner,
  Tabs,
  Board,
  ContentWrapper,
  Content,
  MessageContent,
  Writer,
  NoticeCard,
  Title,
  CardWrapper,
} from './style';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Users from './Users';
import Teams from './Teams';
import Statistics from './Statistics';
import useFetch from 'hooks/useFetch';
import { getLastComment } from 'api/item';

/**
 * 메인 화면
 */
function Main() {
  const tabs = {
    Users: { id: 1, name: 'Users', content: <Users /> },
    Teams: { id: 2, name: 'Teams', content: <Teams /> },
    Statistics: { id: 3, name: '통계', content: <Statistics /> },
  };

  const [message] = useFetch(getLastComment, '');
  const [currentTab, setCurrentTab] = useState(tabs.Users);

  const onClickTab = useCallback((key) => {
    setCurrentTab(tabs[key]);
  }, []);

  return (
    <div>
      <Header />
      <Banner>
        <Board>
          <CardWrapper>
            {/* <NoticeCard>
              <Title>공지 사항</Title>
            </NoticeCard> */}
            {!isEmpty(message.user) && (
              <NoticeCard>
                <Title>나의 한마디</Title>
                <MessageContent>"{message.message}"</MessageContent>
                <Writer>
                  {message.user?.notionId} {message.user?.emoji},{' '}
                  {moment(message.writtenDate).format('YYYY-MM-DD')}
                </Writer>
              </NoticeCard>
            )}
          </CardWrapper>
        </Board>
      </Banner>
      <ContentWrapper>
        <Tabs>
          {Object.keys(tabs).map((key) => (
            <div
              key={key}
              className={currentTab.id === tabs[key].id ? 'selected' : ''}
              onClick={() => {
                onClickTab(key);
              }}
            >
              {tabs[key].name}
            </div>
          ))}
        </Tabs>
        <Content>{currentTab.content}</Content>
      </ContentWrapper>
    </div>
  );
}

export default Main;
