import React from 'react';
import useFetch from 'hooks/useFetch';
import { getAllUsers } from 'api/user';
import TeamCard from './TeamCard';
import ScoreCard from './ScoreCard';
import { TeamWrapper, CardWrapper } from './style';

/**
 * 팀 탭 내용 컴포넌트
 */
function Teams() {
  // 모든 사용자 정보 조회
  const [users] = useFetch(getAllUsers, null, []);

  return (
    <TeamWrapper>
      <CardWrapper>
        <TeamCard team={0} users={users} />
        <ScoreCard team={0} users={users} />
      </CardWrapper>
      <CardWrapper>
        <TeamCard team={1} users={users} />
        <ScoreCard team={1} users={users} />
      </CardWrapper>
    </TeamWrapper>
  );
}

export default Teams;
