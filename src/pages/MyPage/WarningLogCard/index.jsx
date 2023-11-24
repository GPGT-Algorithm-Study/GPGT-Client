import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
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
import { LOG_PREFIX_URL, WARNING_PAEG_SIZE } from 'utils/constants';
import useSWRInfinite from 'swr/infinite';
import fetcher from 'utils/fetcher';
import { useParams } from 'react-router-dom';

/**
 * 마이페이지 경고 현황 카드
 */
function WarningLogCard({ totalWarning }) {
  const [isEndPage, setIsEndPage] = useState(false);
  const [isLoadingLog, setIsLoadingLog] = useState(false);
  const { bojHandle } = useParams();

  const getKey = useCallback(
    (page, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null; // 끝에 도달
      return `${LOG_PREFIX_URL}/warning/user/page?bojHandle=${bojHandle}&page=${page}&size=${WARNING_PAEG_SIZE}`; // SWR 키
    },
    [bojHandle],
  );

  const {
    data: warningLogs,
    size,
    setSize,
    isLoading,
  } = useSWRInfinite(getKey, fetcher);

  // 페이지 끝인지, 로딩 중인지 판별하는 변수 설정
  useEffect(() => {
    if (!warningLogs) return;
    const isLoadingMore =
      isLoading ||
      (size > 0 && warningLogs && typeof warningLogs[size - 1] === 'undefined');
    const isReachingEnd =
      warningLogs?.[0]?.length === 0 ||
      (warningLogs &&
        warningLogs[warningLogs.length - 1]?.length < WARNING_PAEG_SIZE);
    setIsLoadingLog(isLoadingMore);
    setIsEndPage(isReachingEnd);
  }, [warningLogs, size]);

  const onClickMoreButton = useCallback(() => {
    setSize(size + 1);
  }, [size]);

  if (!warningLogs) return null;

  return (
    <Card>
      <Title>경고 현황</Title>
      <TotalWarning>
        <Warning />
        {totalWarning}
      </TotalWarning>
      <LogWrapper>
        {warningLogs.map((logs) =>
          logs.map((log) => (
            <Log state={log.state} key={log.id}>
              <TextWrapper>
                <Date>{dayjs(log.createdDate).format('M월 D일')}</Date>
                <LogMsg>{log.description}</LogMsg>
              </TextWrapper>
              <Value plus={log.changedValue >= 0}>
                {log.changedValue >= 0 ? '+ ' : '- '}
                {Math.abs(log.changedValue)}
              </Value>
            </Log>
          )),
        )}
      </LogWrapper>
      {!isEndPage && (
        <Button onClick={onClickMoreButton} disabled={isLoadingLog}>
          {isLoadingLog ? '로딩 중' : '더 보기'}
        </Button>
      )}
    </Card>
  );
}

export default WarningLogCard;
