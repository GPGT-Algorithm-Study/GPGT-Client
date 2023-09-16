import React from 'react';
import { Title, ButtonWrapper, Card, ModeButton, TitleWrapper } from './style';
import UserAddDeletePage from './UserAddDeletePage';
import { useState } from 'react';
import WarningManage from '../WarningManage';
import PointManage from '../PointManage';

function CurrentPage({ mode }) {
  console.log(mode);
  if (mode === 1) return <UserAddDeletePage></UserAddDeletePage>;
  if (mode === 2) return <WarningManage />;
  if (mode === 3) return <PointManage />;
  else return <div>??</div>;
}

function UserManageList() {
  const modeList = [
    { key: 1, name: '삭제/추가' },
    { key: 2, name: '경고' },
    { key: 3, name: '포인트' },
  ];
  const [mode, setMode] = useState(modeList[0].key);

  return (
    <Card>
      <TitleWrapper>
        <Title>유저 관리</Title>
        <ButtonWrapper>
          {modeList.map((m) => (
            <ModeButton
              key={m.key}
              onClick={() => {
                setMode(m.key);
              }}
              selected={m.key === mode}
            >
              {m.name}
            </ModeButton>
          ))}
        </ButtonWrapper>
      </TitleWrapper>
      <CurrentPage mode={mode} />
    </Card>
  );
}

export default UserManageList;
