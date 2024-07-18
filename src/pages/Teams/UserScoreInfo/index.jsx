import React from 'react';
import { Container, NameWrapper, ProfileWrapper, ScoreInfo } from './style';
import { CommonProfileImage } from 'style/commonStyle';

function UserScoreInfo({ teamUser, isTop = false }) {
  return (
    <Container>
      <ProfileWrapper>
        <CommonProfileImage
          width={40}
          height={40}
          src={
            teamUser.profileImg != 'null'
              ? teamUser.profileImg
              : 'https://static.solved.ac/misc/360x360/default_profile.png'
          }
        />
        <NameWrapper>
          {teamUser.notionId} {teamUser.emoji}
          <span>{teamUser.bojHandle}</span>
        </NameWrapper>
      </ProfileWrapper>
      <ScoreInfo>
        {teamUser.point}
        <span> 포인트 획득 </span>
        {isTop && ' 🎉'}
      </ScoreInfo>
    </Container>
  );
}

export default UserScoreInfo;
