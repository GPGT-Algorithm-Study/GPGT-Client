import React, { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import ScoreCard from './ScoreCard';
import { TeamWrapper, CardWrapper, Container } from './style';
import useSWR from 'swr';
import { PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import PageTitle from 'components/PageTitle';
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

  return (
    <Container>
      <PageTitle showLeftTime={true} title="팀" />
      <TeamWrapper>
        {teams.map((team, i) => (
          <CardWrapper key={i}>
            <TeamCard teamInfo={team} />
            <ScoreCard teamInfo={team} />
          </CardWrapper>
        ))}
      </TeamWrapper>
    </Container>
  );
}

export default Teams;
