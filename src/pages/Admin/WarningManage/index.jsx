import React, { useEffect } from 'react';
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
  const [reason, setReason] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(users);
  const onSelect = (e) => {
    const { name, value, checked } = e.target;
    if (!checked) {
      setSelectedUsers(selectedUsers.filter((user) => user.notionId !== value));
    } else {
      const newUser = { [name]: value };
      setSelectedUsers(selectedUsers.concat(newUser));
    }
  };
  const onChange = (e) => {
    setReason(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const selectedUserNotionId = selectedUsers
      .map((user) => `${user.notionId}`)
      .join(', ');

    confirm(
      selectedUserNotionId +
        '에게 경고 부여\n' +
        '사유 : ' +
        reason +
        '\n위와 같이 경고를 ' +
        (isPlusMode ? '부여' : '차감') +
        ' 하시겠습니까?',
    );
    setReason('');
  };
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
            <input
              type="checkbox"
              name="notionId"
              value={user.notionId}
              onChange={onSelect}
            ></input>
            {user.notionId} {user.emoji} : 경고 {user.warning}회. 포인트{' '}
            {user.point}.{' '}
            {user.isYesterdaySolved ? '어제 안 풀었음' : '어제 풀었음'}
          </UserItem>
        ))}
      </VerticalUserListWrapper>
      <div align="center">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={
              isPlusMode ? '경고 부여 사유 입력...' : '경고 차감 사유 입력...'
            }
            name="reason"
            value={reason}
            onChange={onChange}
            style={{ width: '100%', height: '30px', marginBottom: '10px' }}
          ></input>
          <button
            type="submit"
            style={{
              color: 'white',
              backgroundColor: isPlusMode ? 'crimson' : 'royalblue',
            }}
          >
            {isPlusMode ? '경고 부여' : '경고 차감'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WarningManage;
