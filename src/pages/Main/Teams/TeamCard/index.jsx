import React from 'react';
import {
  Card,
  FlexWrapper,
  ColumnWrapper,
  ImageWrapper,
  ContributorWrapper,
  ProfileImage,
  IconWrapper,
} from './style';
import TeamIcon from 'components/TeamIcon';

/**
 * 팀 카드 컴포넌트
 */
function TeamCard({ team }) {
  return (
    <Card>
      <FlexWrapper>
        <IconWrapper>
          <TeamIcon height="150" width="80" team={team?.team.teamNumber} />
        </IconWrapper>
        <ColumnWrapper>
          <div>Rank</div> <p>#{team?.rank}</p>
        </ColumnWrapper>
        <ColumnWrapper>
          <div>Score</div> <p>{team?.team.teamPoint}</p>
        </ColumnWrapper>
        <ColumnWrapper>
          <div>Solved</div> <p>{team?.solved}</p>
        </ColumnWrapper>
        <ContributorWrapper>
          <div>Top Contributor</div>
          <ImageWrapper>
            <ProfileImage
              src={
                team?.topContributor.profileImg != 'null'
                  ? team?.topContributor.profileImg
                  : 'https://static.solved.ac/misc/360x360/default_profile.png'
              }
            />
            <p>
              {team?.topContributor.notionId} {team?.topContributor.emoji}{' '}
            </p>
          </ImageWrapper>
        </ContributorWrapper>
      </FlexWrapper>
    </Card>
  );
}

export default TeamCard;
