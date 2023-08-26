import React from 'react';
import moment from 'moment';
import {
  Card,
  Title,
  Point,
  LogWrapper,
  Log,
  LogMsg,
  TextWrapper,
  Date,
  TotalPoint,
} from './style';
import useFetch from 'hooks/useFetch';
import { getUserPointLog } from 'api/user';

/**
 * 마이페이지 포인트 현황 카드
 */
function PointCard({ userInfo }) {
  const [pointLogs] = useFetch(getUserPointLog, [], {
    bojHandle: userInfo.bojHandle,
  });

  return (
    <Card>
      <Title>포인트 현황</Title>
      <TotalPoint>
        <p>P</p> {userInfo.point}
      </TotalPoint>
      <LogWrapper>
        {pointLogs.map((log, i) => (
          <Log state={log.state} key={i}>
            <TextWrapper>
              <Date>{moment(log.createdDate).format('M월 D일')}</Date>
              <LogMsg>{log.description}</LogMsg>
            </TextWrapper>
            <Point plus={log.changedValue >= 0}>
              {Math.abs(log.changedValue)}
              <p>P</p>
              {log.changedValue >= 0 ? ' +' : ' -'}
            </Point>
          </Log>
        ))}
      </LogWrapper>
    </Card>
  );
}

export default PointCard;
