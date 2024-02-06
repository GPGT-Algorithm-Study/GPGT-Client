import React, { useState } from 'react';
import { Card, Title } from './style';
import PointLog from './PointLog';
import WarningLog from './WarningLog';
import Tab from 'components/Tab';

/**
 * 마이페이지 유저가 쓴 글 카드
 */
function LogCard({ userInfo }) {
  const [curTab, setCurTab] = useState(0);

  return (
    <Card>
      <Title>
        📈 로그
        <Tab>
          <div
            className={`tab-item ${curTab === 0 ? 'selected' : ''}`}
            onClick={() => {
              setCurTab(0);
            }}
          >
            포인트
          </div>
          <div
            className={`tab-item ${curTab === 1 ? 'selected' : ''}`}
            onClick={() => {
              setCurTab(1);
            }}
          >
            경고
          </div>
        </Tab>
      </Title>
      {curTab === 0 && <PointLog totalPoint={userInfo.point} />}
      {curTab === 1 && <WarningLog totalWarning={userInfo.warning} />}
    </Card>
  );
}

export default LogCard;
