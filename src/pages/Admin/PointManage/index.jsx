import React, { useState } from 'react';
import {
  Content,
  FormWrapper,
  Title,
  UserItem,
  VerticalUserListWrapper,
} from './style';
import useFetch from 'hooks/useFetch';
import { getAllUsers } from 'api/user';
import { Button } from './style';
import { postUserPoint } from 'api/log';

function PointManage() {
  const [users, reFetch] = useFetch(getAllUsers, []);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [pointManageReason, setPointManageReason] = useState('');
  const onReasonChange = (e) => {
    setPointManageReason(e.target.value);
  };
  const onClickSubmit = (e) => {
    e.preventDefault();
    const selectedInfo = { string: '' };
    selectedUsers.map((selectedUser) => {
      if (selectedUser.changeValue === '0') return;
      selectedInfo.string = selectedInfo.string.concat(
        `${selectedUser.notionId}에게 ${selectedUser.changeValue}포인트\n`,
      );
    });
    selectedInfo.string = selectedInfo.string.concat(
      '조정 사유 : ' + pointManageReason,
    );
    const isAgree = confirm(
      selectedInfo.string + '\n 위와 같이 포인트를 조정하시겠습니까?',
    );
    if (!isAgree) return;
    selectedUsers.map((selectedUser) => {
      if (selectedUser.changeValue === '0') return;
      const info = {
        bojHandle: selectedUser.bojHandle,
        changedValue: selectedUser.changeValue,
        description: pointManageReason,
      };
      postUserPoint(info)
        .then((res) => {
          if (res.data.code !== 200)
            //에러처리
            console.log(res);
          return;
        })
        .catch((e) => {
          const { data } = e.response;
          if (data && data.code == 400) toast.error(data.message);
        });
    });
    setSelectedUsers([]);
    setPointManageReason('');
    reFetch();
    window.location.reload();
  };
  const onPointChange = (e, userNotionId, bojHandle) => {
    const { value } = e.target;

    const selectedUserIndex = selectedUsers.findIndex(
      (user) => user.notionId === userNotionId,
    );
    if (selectedUserIndex !== -1) {
      //이미 해당 유저가 selectedUsers에 있는경우
      const updatedSelectedUsers = [...selectedUsers];
      updatedSelectedUsers[selectedUserIndex].changeValue = value;
      setSelectedUsers(updatedSelectedUsers);
    } else {
      //해당 유저가 처음 point조정되는 경우
      const newUser = {
        notionId: userNotionId,
        bojHandle: bojHandle,
        changeValue: value,
      };
      setSelectedUsers(selectedUsers.concat(newUser));
    }
  };
  return (
    <Content>
      <Title>포인트 조정</Title>
      <VerticalUserListWrapper>
        {users.map((user) => (
          <UserItem key={user.notionId}>
            <input
              type="number"
              onChange={(e) => onPointChange(e, user.notionId, user.bojHandle)}
              style={{ width: '40px' }}
            ></input>
            {user.emoji} {user.notionId}. 경고:{user.warning}회. 보유중인
            포인트:{user.point}
          </UserItem>
        ))}
      </VerticalUserListWrapper>
      <div align="center">
        <form>
          <input
            type="text"
            placeholder="포인트 조정 사유 입력.."
            onChange={onReasonChange}
            style={{ width: '100%', height: '30px', marginBottom: '10px' }}
          ></input>
          <Button
            onClick={onClickSubmit}
            style={{ backgroundColor: 'royalblue' }}
          >
            포인트 조정
          </Button>
        </form>
      </div>
    </Content>
  );
}

export default PointManage;
