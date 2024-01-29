import React from 'react';
import { delUser } from 'api/user';
import { useState } from 'react';
import {
  Content,
  VerticalUserListWrapper,
  Button,
  UserItem,
  Title,
} from './style';
import { toast } from 'react-toastify';
import UserAddInput from '../UserAddInput';
import Modal from 'layouts/Modal';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';

function UserAddDeletePage() {
  const { data: users, mutate: mutateUsers } = useSWR(
    `${USER_PREFIX_URL}/info/all`,
    fetcher,
  );
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
    mutateUsers();
  };

  if (!users) return null;

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
          mutateUsers();
        }}
      >
        <UserAddInput />
      </Modal>
    </Content>
  );
}

export default UserAddDeletePage;
