import React from 'react';
import {
  Card,
  TeamInfoContainer,
  ColumnWrapper,
  TeamInfoWrapper,
  TeamName,
  TeamScoreInfo,
  MvpInfoWrapper,
  MvpTitle,
} from './style';
import TeamIcon from 'components/TeamIcon';
import UserScoreInfo from '../UserScoreInfo';

/**
 * 팀 카드 컴포넌트
 */
function TeamCard({ teamInfo }) {
  return (
    <Card>
      <TeamInfoContainer>
        <TeamInfoWrapper>
          <TeamIcon width="65" team={teamInfo.team.teamNumber} />
          <TeamName>{teamInfo.team.teamName}</TeamName>
        </TeamInfoWrapper>
        <TeamScoreInfo>
          <ColumnWrapper team={teamInfo.team.teamNumber}>
            <p>{teamInfo.rank}</p> <div>rank</div>
          </ColumnWrapper>
          <ColumnWrapper team={teamInfo.team.teamNumber}>
            <p>{teamInfo.team.teamPoint}</p> <div>score</div>
          </ColumnWrapper>
          <ColumnWrapper team={teamInfo.team.teamNumber}>
            <p>{teamInfo.solved}</p> <div>solved</div>
          </ColumnWrapper>
        </TeamScoreInfo>
      </TeamInfoContainer>
      <MvpInfoWrapper>
        <MvpTitle>🏆 MVP</MvpTitle>
        <UserScoreInfo teamUser={teamInfo.topContributor} isTop />
      </MvpInfoWrapper>
    </Card>
  );
}

export default TeamCard;
