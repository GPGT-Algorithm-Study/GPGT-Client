import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
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
import { LOG_PREFIX_URL, POINT_PAGE_SIZE } from 'utils/constants';
import useSWRInfinite from 'swr/infinite';
import fetcher from 'utils/fetcher';
import { useParams } from 'react-router-dom';
import useIntersect from 'hooks/useIntersect';

/**
 * 마이페이지 포인트 현황 카드
 */
function PointLogCard({ totalPoint }) {
  const [isEndPage, setIsEndPage] = useState(false);
  const [isLoadingLog, setIsLoadingLog] = useState(false);
  const { bojHandle } = useParams();

  const getKey = useCallback(
    (page, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null; // 끝에 도달
      return `${LOG_PREFIX_URL}/point/user/page?bojHandle=${bojHandle}&page=${page}&size=${POINT_PAGE_SIZE}`; // SWR 키
    },
    [bojHandle],
  );

  const {
    data: pointLogs,
    size,
    setSize,
    isLoading,
  } = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false });

  // 페이지 끝인지, 로딩 중인지 판별하는 변수 설정
  useEffect(() => {
    if (!pointLogs) return;
    const isLoadingMore =
      isLoading ||
      (size > 0 && pointLogs && typeof pointLogs[size - 1] === 'undefined');
    const isReachingEnd =
      pointLogs?.[0]?.length === 0 ||
      (pointLogs && pointLogs[pointLogs.length - 1]?.length < POINT_PAGE_SIZE);
    setIsLoadingLog(isLoadingMore);
    setIsEndPage(isReachingEnd);
  }, [pointLogs, size]);

  const changePage = () => {
    if (!isLoadingLog && !isEndPage) {
      setSize((prev) => prev + 1);
    }
  };
  const bottomRef = useIntersect(changePage);

  if (!pointLogs) return null;

  return (
    <Card>
      <Title>포인트 현황</Title>
      <TotalPoint>
        <p>P</p> {totalPoint}
      </TotalPoint>
      <LogWrapper>
        {pointLogs.flat().map((log) => (
          <Log state={log.state} key={log.id}>
            <TextWrapper>
              <Date>{dayjs(log.createdDate).format('M월 D일')}</Date>
              <LogMsg>{log.description}</LogMsg>
            </TextWrapper>
            <Point plus={log.changedValue >= 0}>
              {log.changedValue >= 0 ? '+ ' : '- '}
              {Math.abs(log.changedValue)}
              <p>P</p>
            </Point>
          </Log>
        ))}
        <Log ref={bottomRef} />
      </LogWrapper>
    </Card>
  );
}

export default PointLogCard;
