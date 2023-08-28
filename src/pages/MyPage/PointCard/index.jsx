import React, { useCallback, useEffect, useState } from 'react';
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
  Button,
} from './style';
import { isEmpty } from 'lodash';
import useFetch from 'hooks/useFetch';
import { getUserPointLog } from 'api/user';

/**
 * 마이페이지 포인트 현황 카드
 */
function PointCard({ userInfo }) {
  const SIZE = 10;
  const [page, setPage] = useState(0);
  const [pointLogs, setPointLogs] = useState([]);
  const [pointLogsPaging, , setParams] = useFetch(getUserPointLog, [], {
    bojHandle: userInfo.bojHandle,
    page,
    size: SIZE,
  });

  useEffect(() => {
    if (isEmpty(pointLogsPaging)) {
      return;
    }
    setPointLogs((prev) => [...prev, ...pointLogsPaging]);
    setPage((prev) => prev + 1);
  }, [pointLogsPaging]);

  const onClickMoreButton = useCallback(() => {
    setParams({
      bojHandle: userInfo.bojHandle,
      page,
      size: SIZE,
    });
  }, [userInfo, page, SIZE]);

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
              {log.changedValue >= 0 ? '+ ' : '- '}
              {Math.abs(log.changedValue)}
              <p>P</p>
            </Point>
          </Log>
        ))}
      </LogWrapper>
      <Button onClick={onClickMoreButton}>더 보기</Button>
    </Card>
  );
}

export default PointCard;
