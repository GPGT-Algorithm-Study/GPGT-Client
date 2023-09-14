import React, { useState } from 'react';
import { FormWrapper, Title, UserItem, VerticalUserListWrapper } from './style';
import useFetch from 'hooks/useFetch';
import { getAllUsers } from 'api/user';
import { Button } from './style';

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
          <UserItem key={user.notionId}>
            <input type="number" style={{ width: '25px' }}></input>
            {user.emoji} {user.notionId}. 보유중인 포인트:{user.point}
          </UserItem>
        ))}
      </VerticalUserListWrapper>
      <div align="center">
        <form>
          <input
            type="text"
            placeholder={
              isPlusMode
                ? '포인트 부여 사유 입력...'
                : '포인트 차감 사유 입력...'
            }
            style={{ width: '100%', height: '30px', marginBottom: '10px' }}
          ></input>
          <Button
            type="submit"
            style={{ backgroundColor: isPlusMode ? 'royalblue' : 'crimson' }}
          >
            {isPlusMode ? '포인트 부여' : '포인트 차감'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PointManage;
