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
import { postUserWarning } from 'api/log';
import user from 'redux/user';
import { toast } from 'react-toastify';

function WarningManage() {
  const [users, fetchUsers] = useFetch(getAllUsers, []);
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
    setReason(e.target.value); //사유 입력
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const selectedUserNotionId = selectedUsers
      .map((user) => `${user.notionId}`)
      .join(', '); //선택된 유저들의 notion아이디를 문자열화

    const isWarningCountInvalid = { flag: false };
    selectedUsers.map((user) => {
      //경고 수가 0~4 범위를 넘지 않는지 확인
      const selected = users.find((u) => u.notionId === user.notionId); //선택된 유저의 정보를 찾고,
      if (
        (isPlusMode && selected.warning >= 4) ||
        (!isPlusMode && selected.warning <= 0)
      )
        //4에서 더하려고 하는지, or 0에서 빼려고 하는지 확인
        isWarningCountInvalid.flag = true;
    });
    if (isWarningCountInvalid.flag) {
      alert('경고는 0 미만 또는 4 초과일 수 없습니다.');
      return;
    }

    const isAgree = confirm(
      selectedUserNotionId +
        '에게 경고 ' +
        (isPlusMode ? '부여\n' : '차감\n') +
        '사유 : ' +
        reason +
        '\n위와 같이 경고를 ' +
        (isPlusMode ? '부여' : '차감') +
        ' 하시겠습니까?',
    );
    if (!isAgree) return;

    selectedUsers.map((user) => {
      const selected = users.find((u) => u.notionId === user.notionId);
      const value = {
        bojHandle: selected.bojHandle,
        changedValue: isPlusMode ? 1 : -1,
        description: reason,
      };
      postUserWarning(value)
        .then((res) => {
          if (res.data.code !== 200)
            //에러처리
            console.log(res);
          return;
        })
        .catch((e) => {
          const { data } = e.response;
          if (data && (data.code == 400 || data.code == 404))
            toast.error(data.message);
        });
    });
    alert(`경고가 ${isPlusMode ? '부여' : '차감'}되었습니다..`);
    setReason('');
    fetchUsers();
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
