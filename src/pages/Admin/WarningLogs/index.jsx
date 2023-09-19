import React from 'react';
import {
  Card,
  Date,
  Log,
  LogMsg,
  LogWrapper,
  Name,
  TextWrapper,
  Title,
  Value,
} from './style';
import useFetch from 'hooks/useFetch';
import { useState } from 'react';
import { getAllWarningLog } from 'api/log';
import { arrayMax } from 'highcharts';
import dayjs from 'dayjs';
import { getAllUsers } from 'api/user';

function WarningLogs() {
  const [users] = useFetch(getAllUsers, []);
  const [allWarningLog] = useFetch(getAllWarningLog, []);
  allWarningLog.sort((a, b) => {
    if (a.id < b.id) return 1;
    else return -1;
  });
  const [isOnlyDeduction, setIsOnlyDeduction] = useState(false);
  return (
    <Card>
      <Title>
        전체 경고 로그
        <fieldset align="right">
          <legend>
            <label>
              경고 차감 내역만 보기
              <input
                type="checkbox"
                onClick={(e) => {
                  setIsOnlyDeduction(e.target.checked);
                }}
              ></input>
            </label>
          </legend>
        </fieldset>
      </Title>
      <LogWrapper>
        {allWarningLog.map((log, index) => {
          const thisUser = users.find((u) => u.bojHandle === log.bojHandle);
          if (isOnlyDeduction === true && log.changedValue > 0) return;
          return (
            <Log state={log.state} key={index}>
              <TextWrapper>
                <Date>{dayjs(log.createdDate).format('M월 D일')}</Date>
                <Name>{thisUser.notionId}</Name>
                <LogMsg>{log.description}</LogMsg>
              </TextWrapper>
              <Value plus={log.changedValue >= 0}>
                {log.changedValue >= 0 ? '+' : '-'}
                {Math.abs(log.changedValue)}
              </Value>
            </Log>
          );
        })}
      </LogWrapper>
    </Card>
  );
}

export default WarningLogs;
