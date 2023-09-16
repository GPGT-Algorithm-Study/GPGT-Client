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
import UserAddInput from './UserAddInput';
import Modal from 'layouts/Modal';

function UserManageList() {
  const [users, reFetch] = useFetch(getAllUsers, []);
  const [showUserAddModal, setShowUserAddModal] = useState(false);
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
    reFetch();
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
      <Button
        isAdd
        onClick={() => {
          setShowUserAddModal(true);
        }}
        style={{ marginLeft: '100px' }}
      >
        신규 유저 등록
      </Button>
      <Modal
        show={showUserAddModal}
        onCloseModal={() => {
          setShowUserAddModal(false);
          reFetch();
        }}
      >
        <UserAddInput />
      </Modal>
    </Card>
  );
}

export default UserManageList;
