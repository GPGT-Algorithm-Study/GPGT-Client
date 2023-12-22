import React, { useMemo } from 'react';
import { CommonProfileImage } from 'style/commonStyle';
import { Card, Medal, NameInfo } from './style';

function TopThreeCard({ user, rank }) {
  const rankInfo = useMemo(
    () => ({
      1: { color: '#f6c73c', label: '1st' },
      2: { color: '#A7B1B2', label: '2nd' },
      3: { color: '#A55C27', label: '3rd' },
    }),
    [],
  );
  return (
    <Card>
      <CommonProfileImage
        width={80}
        height={80}
        src={
          user.profileImg != 'null'
            ? user.profileImg
            : 'https://static.solved.ac/misc/360x360/default_profile.png'
        }
      />
      <Medal color={rankInfo[rank].color}>{rankInfo[rank].label}</Medal>
      <NameInfo>
        {user.notionId}&nbsp;{user.emoji}
      </NameInfo>
      <span>{user.totalSolved}문제 해결</span>
    </Card>
  );
}

export default TopThreeCard;
