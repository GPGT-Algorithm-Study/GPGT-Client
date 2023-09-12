import React from 'react';
import { FormWrapper, Title, UserItem, VerticalUserListWrapper } from './style';
import useFetch from 'hooks/useFetch';
import { getAllUsers } from 'api/user';

function PointManage() {
  const [users] = useFetch(getAllUsers, []);
  return (
    <div>
      <Title>포인트 부여/차감</Title>
      <VerticalUserListWrapper>
        {users.map((user) => (
          <UserItem id={user.notionId}>
            {user.emoji} {user.notionId}
          </UserItem>
        ))}
      </VerticalUserListWrapper>
    </div>
  );
}

export default PointManage;
