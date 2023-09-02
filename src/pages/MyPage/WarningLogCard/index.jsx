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
import { useSelector, useDispatch } from 'react-redux';
import { setIsUseItem } from 'redux/item';

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
  const { isUseItem } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUseItem) return;
    reload();
    dispatch(setIsUseItem(false));
  }, [isUseItem]);

  const reload = useCallback(() => {
    setPage(0);
    setWarningLogs([]);
    setIsEndPage(false);
    setParams({
      bojHandle: userInfo.bojHandle,
      page: 0,
      size: SIZE,
    });
  }, []);

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
