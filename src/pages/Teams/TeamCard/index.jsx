import React from 'react';
import { Card, FlexWrapper, ColumnWrapper, IconWrapper } from './style';
import TeamIcon from 'components/TeamIcon';

/**
 * 팀 카드 컴포넌트
 */
function TeamCard({ team }) {
  return (
    <Card>
      <FlexWrapper>
        <IconWrapper>
          <TeamIcon height="120" width="65" team={team?.team.teamNumber} />
        </IconWrapper>
        <ColumnWrapper team={team?.team.teamNumber}>
          <div>RANK</div> <p>#{team?.rank}</p>
        </ColumnWrapper>
        <ColumnWrapper team={team?.team.teamNumber}>
          <div>SCORE</div> <p>{team?.team.teamPoint}</p>
        </ColumnWrapper>
        <ColumnWrapper team={team?.team.teamNumber}>
          <div>SOLVED</div> <p>{team?.solved}</p>
        </ColumnWrapper>
      </FlexWrapper>
    </Card>
  );
}

export default TeamCard;
