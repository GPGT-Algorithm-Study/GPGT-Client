import React from 'react';
import {
  Button,
  FormWrapper,
  InputWrapper,
  Title,
  UserAddWrapper,
} from './style';
import { useState } from 'react';
import { postNewUser } from 'api/user';

function UserAddInput() {
  const [isChecked, setIsChecked] = useState(false);
  const [newUserData, setNewUserData] = useState({
    bojHandle: '',
    notionId: '',
    isManager: 0,
    emoji: '',
    password: '',
  });
  const onInfoChange = (e) => {
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
  const onInfoSubmit = (e) => {
    if (!isFormValid()) {
      alert('입력되지 않은 정보가 있습니다.');
      return;
    }
    if (isChecked) newUserData.isManager = 1;
    else newUserData.isManager = 0;
    const isAgree = confirm(
      '추가하려는 유저의 정보:\nbojHandle: ' +
        newUserData.bojHandle +
        '\nnotionId: ' +
        newUserData.notionId +
        '\n관리자: ' +
        (newUserData.isManager === 1 ? 'O' : 'X') +
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
  return (
    <div align="center">
      <Title>신규 유저 등록</Title>
      <FormWrapper>
        <InputWrapper>
          <input
            type="text"
            name="bojHandle"
            placeholder="BOJ Handle"
            value={newUserData.bojHandle}
            onChange={onInfoChange}
          />
          백준 핸들
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            name="notionId"
            placeholder="Notion ID"
            value={newUserData.notionId}
            onChange={onInfoChange}
          />
          노션 Id
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            name="emoji"
            placeholder="Emoji"
            value={newUserData.emoji}
            onChange={onInfoChange}
          />
          이모지
        </InputWrapper>
        <InputWrapper>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUserData.password}
            onChange={onInfoChange}
          />
          초기 비밀번호
        </InputWrapper>
        <InputWrapper>
          <label>
            <input
              type="checkbox"
              name="isManager"
              placeholder="관리자?"
              value={newUserData.isManager}
              onChange={(e) => {
                if (e.target.checked) setIsChecked(true);
                else setIsChecked(false);
              }}
            />
            관리자인 경우 체크
          </label>
        </InputWrapper>
        <Button onClick={onInfoSubmit}>등록</Button>
      </FormWrapper>
    </div>
  );
}

export default UserAddInput;
