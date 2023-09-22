import React from 'react';
import { useState } from 'react';
import {
  Button,
  ButtonWrapper,
  Card,
  Date,
  Id,
  Log,
  LogMsg,
  LogWrapper,
  ModeButton,
  Name,
  TextWrapper,
  Title,
  TitleWrapper,
  Value,
} from './style';
import { getAllUsers } from 'api/user';
import { getAllPointLog, getAllWarningLog } from 'api/log';
import useFetch from 'hooks/useFetch';
import dayjs from 'dayjs';

function CurrentPage({ mode, curLogList, isOnly, users }) {
  return (
    <LogWrapper>
      {curLogList.map((log, index) => {
        const thisUser = users.find((u) => u.bojHandle === log.bojHandle);
        if (isOnly === true && log.changedValue >= 0) return;
        return (
          <Log state={log.state} key={index}>
            <TextWrapper>
              <Id mode={mode}>{log.id}.</Id>
              <Date>{dayjs(log.createdDate).format('M월D일 HH:mm:ss')}</Date>
              <Name>{thisUser?.notionId}</Name>
            </TextWrapper>
            <LogMsg>{log.description}</LogMsg>
            <Value plus={log.changedValue >= 0} mode={mode}>
              {log.changedValue >= 0 ? '+' : '-'}
              {Math.abs(log.changedValue)}
            </Value>
          </Log>
        );
      })}
    </LogWrapper>
  );
}

function ShowAllUserLogs() {
  const [users] = useFetch(getAllUsers, []);
  const [allPointLog] = useFetch(getAllPointLog, []);
  allPointLog.sort((a, b) => {
    if (a.id < b.id) return 1;
    else return -1;
  });
  const [allWarningLog] = useFetch(getAllWarningLog, []);
  allWarningLog.sort((a, b) => {
    if (a.id < b.id) return 1;
    else return -1;
  });
  const modeList = [
    { key: 1, name: '경고' },
    { key: 2, name: '포인트' },
  ];

  const [mode, setMode] = useState(modeList[0].key);
  const [isOnly, setIsOnly] = useState(false);
  return (
    <Card>
      <TitleWrapper>
        <Title>{mode === 1 ? '전체 경고 로그' : '전체 포인트 로그'}</Title>
        <ButtonWrapper>
          {modeList.map((m) => (
            <ModeButton
              key={m.key}
              onClick={() => {
                setMode(m.key);
                setIsOnly(false);
                const checkbox = document.getElementById('isOnlyCheckbox');
                checkbox.checked = false;
              }}
              selected={m.key === mode}
            >
              {m.name}
            </ModeButton>
          ))}
        </ButtonWrapper>
      </TitleWrapper>
      <div>
        <Title>
          <fieldset align="right">
            <legend>
              <label style={{ cursor: 'pointer' }}>
                {mode === 1
                  ? '경고 차감 내역만 보기'
                  : '포인트 사용 내역만 보기'}
                <input
                  type="checkbox"
                  id="isOnlyCheckbox"
                  onClick={(e) => {
                    setIsOnly(e.target.checked);
                  }}
                ></input>
              </label>
            </legend>
          </fieldset>
        </Title>
        <TextWrapper>
          <div style={{ width: '50px' }}>ID</div>
          <div style={{ width: '150px' }}>날짜</div>
          <div style={{ width: '130px' }}>노션 아이디</div>
          <div>사유</div>
        </TextWrapper>
        <CurrentPage
          mode={mode}
          curLogList={mode === 1 ? allWarningLog : allPointLog}
          isOnly={isOnly}
          users={users}
        />
      </div>
    </Card>
  );
}

export default ShowAllUserLogs;
