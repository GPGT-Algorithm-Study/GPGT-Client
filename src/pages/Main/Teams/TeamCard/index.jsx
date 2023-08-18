import React from 'react';
import {
  Card,
  UserInfoWrapper,
  FlexWrapper,
  ColumnWrapper,
  ImageWrapper,
  ContributorWrapper,
  ProfileImage,
  IconWrapper,
  UserTag,
} from './style';
import TeamIcon from 'components/TeamIcon';

/**
 * 팀 카드 컴포넌트
 */
function TeamCard({ team, users }) {
  return (
    <Card>
      <FlexWrapper>
        <IconWrapper>
          <TeamIcon height="180" width="100" team={team} />
        </IconWrapper>
        <ColumnWrapper>
          <div>Rank</div> <p>#1</p>
        </ColumnWrapper>
        <ColumnWrapper>
          <div>Score</div> <p>124</p>
        </ColumnWrapper>
        <ColumnWrapper>
          <div>Solved</div> <p>30</p>
        </ColumnWrapper>
        <ContributorWrapper>
          <div>Top Contributor</div>
          <ImageWrapper>
            <ProfileImage src="https://static.solved.ac/uploads/profile/360x360/asdf016182-picture-1683285947529.png" />
            <p>klloo 🏖️ </p>
          </ImageWrapper>
        </ContributorWrapper>
      </FlexWrapper>
      <UserInfoWrapper>
        {users.map((user, i) => {
          // 임시 코드
          if (team == 0 && i >= 11) return null;
          if (team == 1 && i < 11) return null;
          // 임시 코드
          if (user.team == team || true) {
            return (
              <UserTag key={user.notionId} team={team}>
                {user.notionId}
                &nbsp;
                {user.emoji}
              </UserTag>
            );
          } else {
            return null;
          }
        })}
      </UserInfoWrapper>
    </Card>
  );
}

export default TeamCard;
