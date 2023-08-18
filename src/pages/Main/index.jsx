import React, { useCallback, useState } from 'react';
import Header from 'layouts/Header';
import { Banner, Tabs, Board, ContentWrapper } from './style';
import Users from './Users';
import Teams from './Teams';
import Statistics from './Statistics';

/**
 * 메인 화면
 */
function Main() {
  const tabs = {
    Users: { id: 1, name: 'Users', content: <Users /> },
    Teams: { id: 2, name: 'Teams', content: <Teams /> },
    Statistics: { id: 3, name: '통계', content: <Statistics /> },
  };

  const [currentTab, setCurrentTab] = useState(tabs.Users);

  const onClickTab = useCallback((key) => {
    setCurrentTab(tabs[key]);
  }, []);

  return (
    <div>
      <Header />
      <Banner>
        <Board />
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
      </Banner>
      <ContentWrapper>{currentTab.content}</ContentWrapper>
    </div>
  );
}

export default Main;
