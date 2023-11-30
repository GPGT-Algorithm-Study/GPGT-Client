import React from 'react';
import { CommonProfileImage } from 'style/commonStyle';
import { Card } from './style';

function TopThreeCard({ user, rank }) {
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
      <div>
        {user.notionId}&nbsp;{user.emoji}
      </div>
      <span>{user.totalSolved}문제 해결</span>
    </Card>
  );
}

export default TopThreeCard;
