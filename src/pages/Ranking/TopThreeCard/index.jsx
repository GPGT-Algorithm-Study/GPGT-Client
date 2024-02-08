import React, { useMemo } from 'react';
import { CommonProfileImage } from 'style/commonStyle';
import { Card, Title, NameInfo, ContentWrapper } from './style';

function TopThreeCard({ user, rank }) {
  const rankInfo = useMemo(
    () => ({
      1: '🥇 1위',
      2: '🥈 2위',
      3: '🥉 3위',
    }),
    [],
  );
  return (
    <Card>
      <Title>{rankInfo[rank]}</Title>
      <ContentWrapper>
        <CommonProfileImage
          width={80}
          height={80}
          src={
            user.profileImg != 'null'
              ? user.profileImg
              : 'https://static.solved.ac/misc/360x360/default_profile.png'
          }
        />
        <NameInfo>
          {user.notionId}&nbsp;{user.emoji}
          <span>{user.bojHandle}</span>
        </NameInfo>
        <span>{user.totalSolved}문제 해결</span>
      </ContentWrapper>
    </Card>
  );
}

export default TopThreeCard;
