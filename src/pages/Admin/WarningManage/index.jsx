import React from 'react';
import { useState } from 'react';
import {
  Title,
  VerticalUserListWrapper,
  UserItem,
  Button,
  Content,
  ReasonInputWrapper,
  ReasonSelectWrapper,
} from './style';
import { postUserWarning } from 'api/log';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { USER_PREFIX_URL } from 'utils/constants';

function WarningManage() {
  const { data: users, mutate: mutateUsers } = useSWR(
    `${USER_PREFIX_URL}/info/all`,
    fetcher,
  );
  const [isPlusMode, setIsPlusMode] = useState(true);
  const [reason, setReason] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

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
    if (selectedUsers.length === 0) {
      alert('선택된 유저가 없습니다!');
      return;
    }
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
    users.forEach((user) => {
      const input = document.getElementById(`warningInput-${user.notionId}`);
      if (input) input.checked = false;
    });

    alert(`경고가 ${isPlusMode ? '부여' : '차감'}되었습니다..`);
    setReason('');
    setSelectedUsers([]);
    mutateUsers();
  };

  if (!users) return null;

  return (
    <Content>
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
            <label>
              <input
                id={`warningInput-${user.notionId}`}
                type="checkbox"
                name="notionId"
                value={user.notionId}
                onChange={onSelect}
              />
              {user.notionId} {user.emoji} : 경고 {user.warning}회. 포인트{' '}
              {user.point}.{' '}
            </label>
          </UserItem>
        ))}
      </VerticalUserListWrapper>
      <div align="center">
        <form onSubmit={onSubmit}>
          <ReasonSelectWrapper
            value="select"
            onChange={(e) => {
              setReason(e.target.value);
            }}
          >
            <option value="select" disabled hidden>
              사유 선택..
            </option>
            {isPlusMode === true && (
              <>
                <option value="주 노션 5일 미만 작성">
                  • 주 노션 5일 미만 작성
                </option>
                <option value="스트릭 break">• 스트릭 break</option>
              </>
            )}
            {isPlusMode === false && (
              <>
                <option value="스트릭 프리즈 사용">• 스트릭 프리즈 사용</option>
              </>
            )}
            <option value="">• 직접 입력하기</option>
          </ReasonSelectWrapper>
          <ReasonInputWrapper
            type="text"
            placeholder={
              isPlusMode ? '경고 부여 사유 입력...' : '경고 차감 사유 입력...'
            }
            name="reason"
            value={reason}
            onChange={onChange}
          />

          <Button
            onClick={onSubmit}
            style={{
              color: 'white',
              backgroundColor: isPlusMode ? 'crimson' : 'royalblue',
            }}
          >
            {isPlusMode ? '경고 부여' : '경고 차감'}
          </Button>
        </form>
      </div>
    </Content>
  );
}

export default WarningManage;
