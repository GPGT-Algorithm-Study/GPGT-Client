import React, { useEffect, useState } from 'react';
import {
  Card,
  ProfileImage,
  NameWrapper,
  RankWrapper,
  ScoreWrappeer,
} from './style';

function ScoreCard({ team }) {
  const [users, setUsers] = useState([]);

  // 포인트에 따라 사용자 정렬
  useEffect(() => {
    setUsers(team.users?.sort((a, b) => b.point - a.point));
  }, [team]);

  return (
    <Card>
      {users?.map((user) => (
        <RankWrapper key={user.notionId}>
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
          <ScoreWrappeer>{user.point}</ScoreWrappeer>
        </RankWrapper>
      ))}
    </Card>
  );
}

export default ScoreCard;
