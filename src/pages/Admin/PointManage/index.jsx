import React, { useState } from 'react';
import { FormWrapper, Title, UserItem, VerticalUserListWrapper } from './style';
import useFetch from 'hooks/useFetch';
import { getAllUsers } from 'api/user';

function PointManage() {
  const [isPlusMode, setIsPlusMode] = useState(true);
  const [users] = useFetch(getAllUsers, []);
  return (
    <div>
      <Title>
        포인트 {isPlusMode ? '부여' : '차감'}
        <fieldset>
          <legend>
            <label>
              <input
                type="radio"
                placeholder="부여"
                onChange={() => {
                  setIsPlusMode(true);
                }}
                checked={isPlusMode}
              ></input>
              부여
            </label>
            <label>
              <input
                type="radio"
                placeholder="차감"
                onChange={() => {
                  setIsPlusMode(false);
                }}
                checked={!isPlusMode}
              ></input>
              차감
            </label>
          </legend>
        </fieldset>
      </Title>
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
