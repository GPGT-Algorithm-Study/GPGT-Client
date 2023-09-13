import React from 'react';
import { delUser, getAllUsers, postNewUser } from 'api/user';
import useFetch from 'hooks/useFetch';
import { useState } from 'react';
import {
  Title,
  Content,
  UserWrapper,
  VerticalUserListWrapper,
  ButtonWrapper,
  Button,
  UserItem,
  Card,
  UserAddWrapper,
} from './style';
import { toast } from 'react-toastify';

function UserManageList() {
  const [users] = useFetch(getAllUsers, []);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const onClickUserAdd = () => {
    setIsAddingUser(!isAddingUser);
  };
  const [newUserData, setNewUserData] = useState({
    bojHandle: '',
    notionId: '',
    isManager: 0,
    emoji: '',
    password: '',
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };
  const isFormValid = () => {
    return (
      newUserData.bojHandle !== '' &&
      newUserData.notionId !== '' &&
      newUserData.emoji !== '' &&
      newUserData.password !== ''
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const isAgree = confirm(
      '추가하려는 유저의 정보:\nbojHandle: ' +
        newUserData.bojHandle +
        '\nnotionId: ' +
        newUserData.notionId +
        '\nisManager: ' +
        newUserData.isManager +
        '\nemoji: ' +
        newUserData.emoji +
        '\npasword: ****\n 맞습니까?',
    );
    if (!isAgree) return;
    postNewUser(newUserData)
      .then((res) => {
        if (res.data.code != 200)
          //에러 처리
          console.log(res);
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code == 400) toast.error(data.message);
      });
    setNewUserData({
      bojHandle: '',
      notionId: '',
      isManager: 0,
      emoji: '',
      password: '',
    });
  };
  const onClickUserDelete = (user) => {
    const isAgree = confirm(
      '<' +
        user.notionId +
        '> 유저를 정말정말정말정말정말진짜로!!!!!\n삭제하시겠습니까?????????',
    );
    if (!isAgree) return;
    delUser(user)
      .then((res) => {
        if (res.data.code !== 200)
          //에러 처리
          console.log(res);
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code == 400) toast.error(data.message);
      });
    alert('삭제되었습니다...');
  };
  return (
    <Card>
      <Title>유저 목록 관리</Title>
      <VerticalUserListWrapper>
        {users.map((user) => (
          <UserItem key={user.notionId}>
            <Button onClick={() => onClickUserDelete(user)}>유저 삭제</Button>
            {user.notionId} {user.emoji} : 경고 {user.warning}회. 포인트{' '}
            {user.point}.{' '}
            {user.isYesterdaySolved ? '어제 안 풀었음' : '어제 풀었음'}
          </UserItem>
        ))}
      </VerticalUserListWrapper>
      <UserAddWrapper>
        <Button isAdd onClick={onClickUserAdd}>
          {isAddingUser ? '취소' : '유저 추가'}
        </Button>
        {isAddingUser && (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="bojHandle"
              placeholder="BOJ Handle"
              value={newUserData.bojHandle}
              onChange={onChange}
            />
            <input
              type="text"
              name="notionId"
              placeholder="Notion ID"
              value={newUserData.notionId}
              onChange={onChange}
            />
            <input
              type="number"
              name="isManager"
              placeholder="관리자?"
              value={newUserData.isManager}
              onChange={onChange}
            />
            <input
              type="text"
              name="emoji"
              placeholder="Emoji"
              value={newUserData.emoji}
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUserData.password}
              onChange={onChange}
            />
            <button type="submit" disabled={!isFormValid()}>
              추가
            </button>
          </form>
        )}
      </UserAddWrapper>
    </Card>
  );
}

export default UserManageList;
