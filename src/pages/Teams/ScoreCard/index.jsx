import React, { useEffect, useState } from 'react';
import {
  Card,
  UserPointWrapper,
  TitleWrapper,
  GraphDescription,
} from './style';
import UserScoreInfo from '../UserScoreInfo';
import Tab from 'components/Tab';
import { IoListSharp } from 'react-icons/io5';
import { MdPieChart } from 'react-icons/md';
import PieGraph from './PieGraph';

function ScoreCard({ teamInfo }) {
  const [users, setUsers] = useState([]);
  const [curTab, setCurTab] = useState(0);

  // 포인트에 따라 사용자 정렬
  useEffect(() => {
    setUsers(teamInfo.users?.sort((a, b) => b.point - a.point));
  }, [teamInfo]);

  return (
    <Card style={curTab === 0 ? { height: '100%' } : {}}>
      <TitleWrapper>
        <div>기여도</div>
        <Tab>
          <div
            onClick={() => {
              setCurTab(0);
            }}
            className={curTab === 0 ? 'selected tab-item' : 'tab-item'}
          >
            <IoListSharp />
          </div>
          <div
            onClick={() => {
              setCurTab(1);
            }}
            className={curTab === 1 ? 'selected tab-item' : 'tab-item'}
          >
            <MdPieChart />
          </div>
        </Tab>
      </TitleWrapper>
      {curTab === 0 && (
        <UserPointWrapper>
          {users?.map((user, i) => (
            <UserScoreInfo key={i} teamUser={user} />
          ))}
        </UserPointWrapper>
      )}
      {curTab === 1 && (
        <div>
          <PieGraph teamUsers={teamInfo.users} score={teamInfo.score} />
          <GraphDescription>
            소수점 첫째 자리에서 반올림한 수치입니다.
          </GraphDescription>
        </div>
      )}
    </Card>
  );
}

export default ScoreCard;
