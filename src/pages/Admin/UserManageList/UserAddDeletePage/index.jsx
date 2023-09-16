import React from 'react';
import { delUser, getAllUsers, postNewUser } from 'api/user';
import useFetch from 'hooks/useFetch';
import { useState } from 'react';
import {
  Content,
  UserWrapper,
  VerticalUserListWrapper,
  Button,
  UserItem,
  Title,
} from './style';
import { toast } from 'react-toastify';
import UserAddInput from '../UserAddInput';
import Modal from 'layouts/Modal';

function UserAddDeletePage() {
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
    <Content>
      <Title>기존 유저 삭제 / 신규 유저 등록</Title>
      <VerticalUserListWrapper>
        {users.map((user) => (
          <UserItem key={user.notionId}>
            <Button onClick={() => onClickUserDelete(user)}>유저 삭제</Button>
            {user.notionId} {user.emoji} : 경고 {user.warning}회. 포인트{' '}
            {user.point}.{' '}
          </UserItem>
        ))}
      </VerticalUserListWrapper>
      <Button
        isAdd
        onClick={() => {
          setShowUserAddModal(true);
        }}
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
    </Content>
  );
}

export default UserAddDeletePage;
