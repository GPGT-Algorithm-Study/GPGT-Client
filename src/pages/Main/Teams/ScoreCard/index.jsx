import React from 'react';
import {
  Card,
  ProfileImage,
  NameWrapper,
  RankWrapper,
  ScoreWrappeer,
} from './style';

function ScoreCard({ team, users }) {
  return (
    <Card>
      {users.map((user, i) => {
        // 임시 코드
        if (team == 0 && i >= 11) return null;
        if (team == 1 && i < 11) return null;
        // 임시 코드
        if (user.team == team || true) {
          return (
            <RankWrapper>
              <NameWrapper>
                <ProfileImage
                  src={
                    user.profileImg != 'null'
                      ? user.profileImg
                      : 'https://static.solved.ac/misc/360x360/default_profile.png'
                  }
                />
                <div className="notion-id">
                  {user.notionId} {user.emoji}
                </div>
                <div className="boj-handle">{user.bojHandle}</div>
              </NameWrapper>
              <ScoreWrappeer>132</ScoreWrappeer>
            </RankWrapper>
          );
        } else {
          return null;
        }
      })}
    </Card>
  );
}

export default ScoreCard;
