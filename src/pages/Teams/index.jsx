import React, { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import ScoreCard from './ScoreCard';
import { TeamWrapper, CardWrapper } from './style';
import LeftTime from 'components/LeftTime';
import { CommonFlexWrapper, CommonTitle } from 'style/commonStyle';
import useSWR from 'swr';
import { PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
/**
 * 팀 탭 내용 컴포넌트
 */
function Teams() {
  const { data: teamInfo } = useSWR(`${PREFIX_URL}/stat/team/all`, fetcher);
  const [teams, setTeams] = useState([]);

  // 랭킹에 따라 팀 정렬
  useEffect(() => {
    if (!teamInfo) return;
    setTeams(teamInfo?.teams?.sort((a, b) => a.rank - b.rank));
  }, [teamInfo]);

  if (!teamInfo) return null;

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
