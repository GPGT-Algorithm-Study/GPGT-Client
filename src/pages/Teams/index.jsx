import React, { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';
import TeamCard from './TeamCard';
import ScoreCard from './ScoreCard';
import { TeamWrapper, CardWrapper } from './style';
import { getAllTeams } from 'api/team';
import LeftTime from 'components/LeftTime';
import { CommonFlexWrapper, CommonTitle } from 'style/commonStyle';
/**
 * 팀 탭 내용 컴포넌트
 */
function Teams() {
  const [teamInfo] = useFetch(getAllTeams, {});
  const [teams, setTeams] = useState([]);

  // 랭킹에 따라 팀 정렬
  useEffect(() => {
    setTeams(teamInfo?.teams?.sort((a, b) => a.rank - b.rank));
  }, [teamInfo]);

  return (
    <div>
      <CommonFlexWrapper>
        <CommonTitle>팀</CommonTitle>
        <LeftTime />
      </CommonFlexWrapper>
      <TeamWrapper>
        {teams?.map((team) => (
          <CardWrapper key={team.team.id}>
            <TeamCard team={team} />
            <ScoreCard team={team} />
          </CardWrapper>
        ))}
      </TeamWrapper>
    </div>
  );
}

export default Teams;
