import React from 'react';
import { getAllUsers } from 'api/user';
import useFetch from 'hooks/useFetch';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import Switch from 'react-switch';
import {
  Title,
  Card,
  ProfileImage,
  ProfileWrapper,
  Warning,
  WarningMsg,
  WarningWrapper,
  IconWrapper,
  UserInfoWrapper,
  CardWrapper,
  VerticalUserListWrapper,
  UserItem,
  Button,
  SwitchWrapper,
} from './style';

function WarningManage() {
  const [users] = useFetch(getAllUsers, []);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [isPlusMode, setIsPlusMode] = useState(true);
  return (
    <div>
      <Title>
        경고 {isPlusMode ? '부여' : '차감'}
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
            <input type="checkbox"></input>
            {user.notionId} {user.emoji} : 경고 {user.warning}회. 포인트{' '}
            {user.point}.{' '}
            {user.isYesterdaySolved ? '어제 안 풀었음' : '어제 풀었음'}
          </UserItem>
        ))}
      </VerticalUserListWrapper>
      <div align="center">
        <form>
          <input
            type="text"
            placeholder={
              isPlusMode ? '경고 부여 사유 입력...' : '경고 차감 사유 입력...'
            }
            style={{ width: '100%', height: '30px', marginBottom: '10px' }}
          ></input>
          <Button
            type="submit"
            style={{ backgroundColor: isPlusMode ? 'crimson' : 'royalblue' }}
          >
            {isPlusMode ? '경고 부여' : '경고 차감'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default WarningManage;
