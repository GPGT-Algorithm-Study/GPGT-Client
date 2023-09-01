import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import {
  Card,
  Title,
  Value,
  LogWrapper,
  Log,
  LogMsg,
  TextWrapper,
  Date,
  TotalWarning,
  Button,
  Warning,
} from './style';
import { isEmpty } from 'lodash';
import useFetch from 'hooks/useFetch';
import { getUserWarningLog } from 'api/log';

/**
 * 마이페이지 경고 현황 카드
 */
function WarningLogCard({ userInfo }) {
  const SIZE = 10;
  const [page, setPage] = useState(0);
  const [warningLogs, setWarningLogs] = useState([]);
  const [isEndPage, setIsEndPage] = useState(false);
  const [wraningLogsPaging, , setParams] = useFetch(getUserWarningLog, [], {
    bojHandle: userInfo.bojHandle,
    page,
    size: SIZE,
  });

  useEffect(() => {
    if (isEmpty(wraningLogsPaging)) {
      setIsEndPage(true);
      return;
    }
    setWarningLogs((prev) => [...prev, ...wraningLogsPaging]);
    setPage((prev) => prev + 1);
  }, [wraningLogsPaging]);

  const onClickMoreButton = useCallback(() => {
    setParams({
      bojHandle: userInfo.bojHandle,
      page,
      size: SIZE,
    });
  }, [userInfo, page, SIZE]);

  return (
    <Card>
      <Title>경고 현황</Title>
      <TotalWarning>
        <Warning />
        {userInfo.warning}
      </TotalWarning>
      <LogWrapper>
        {warningLogs.map((log, i) => (
          <Log state={log.state} key={i}>
            <TextWrapper>
              <Date>{moment(log.createdDate).format('M월 D일')}</Date>
              <LogMsg>{log.description}</LogMsg>
            </TextWrapper>
            <Value plus={log.changedValue >= 0}>
              {log.changedValue >= 0 ? '+ ' : '- '}
              {Math.abs(log.changedValue)}
            </Value>
          </Log>
        ))}
      </LogWrapper>
      {!isEndPage && <Button onClick={onClickMoreButton}>더 보기</Button>}
    </Card>
  );
}

export default WarningLogCard;
