import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import {
  Button,
  ButtonWrapper,
  Card,
  Date,
  HeaderWrapper,
  Id,
  Log,
  LogMsg,
  LogWrapper,
  ModeButton,
  Name,
  SubtitleWrapper,
  TextWrapper,
  Title,
  TitleWrapper,
  Value,
} from './style';
import { putPointLogRollback, putWarningLogRollback } from 'api/log';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import fetcher from 'utils/fetcher';
import {
  LOG_PREFIX_URL,
  ADMIN_POINT_PAGE_SIZE,
  USER_PREFIX_URL,
  ADMIN_WARNING_PAEG_SIZE,
} from 'utils/constants';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Content } from '../PointManage/style';
import LogList from './LogList';
import { Label } from '../WarningManage/style';

function ShowAllUserLogs() {
  const { data: users, mutate: mutateUsers } = useSWR(
    `${USER_PREFIX_URL}/info/all`,
    fetcher,
  );

  // 포인트
  const [isPointEnd, setIsPointEnd] = useState(false);
  const getPointKey = useCallback(
    (page) => {
      if (isPointEnd) return null;
      return `${LOG_PREFIX_URL}/point/all/page?page=${page}&size=${ADMIN_POINT_PAGE_SIZE}`; // SWR 키
    },
    [isPointEnd],
  );

  const {
    data: pointLogs,
    size: pointSize,
    setSize: setPointSize,
    isLoading: isLoadingPointLog,
    mutate: mutatePointLogs,
  } = useSWRInfinite(getPointKey, fetcher, { revalidateFirstPage: false });

  const [allPointLog, setAllPointLog] = useState([]);

  useEffect(() => {
    if (!pointLogs) return;
    const flatLogs = pointLogs.reduce((acc, cur) => {
      return acc.concat(cur.content);
    }, []);
    setIsPointEnd(
      pointLogs[pointSize - 1] && pointLogs[pointSize - 1].content.length === 0,
    );
    setAllPointLog(flatLogs);
  }, [pointLogs]);

  // 경고
  const [isWarningEnd, setIsWarningEnd] = useState(false);
  const getWarningKey = useCallback(
    (page) => {
      if (isWarningEnd) return null;
      return `${LOG_PREFIX_URL}/warning/all/page?page=${page}&size=${ADMIN_WARNING_PAEG_SIZE}`; // SWR 키
    },
    [isWarningEnd],
  );

  const {
    data: warningLogs,
    size: warningSize,
    setSize: setWarningSize,
    isLoading: isLoadingWarningLog,
    mutate: mutateWarningLogs,
  } = useSWRInfinite(getWarningKey, fetcher, { revalidateFirstPage: false });

  const [allWarningLog, setAllWarningLog] = useState([]);

  useEffect(() => {
    if (!warningLogs) return;
    const flatLogs = warningLogs.reduce((acc, cur) => {
      return acc.concat(cur.content);
    }, []);
    setIsWarningEnd(
      warningLogs[warningSize - 1] &&
        warningLogs[warningSize - 1].content.length === 0,
    );
    setAllWarningLog(flatLogs);
  }, [warningLogs]);

  const modeList = [
    { key: 1, name: '경고' },
    { key: 2, name: '포인트' },
  ];

  const [mode, setMode] = useState(modeList[0].key);
  const [isOnly, setIsOnly] = useState(false);
  const [isRollback, setIsRollback] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const resetAllCheckbox = () => {
    if (mode === 2)
      allPointLog.map((log) => {
        const curCheckbox = document.getElementById(`pointCheckbox-${log.id}`);
        if (curCheckbox) curCheckbox.checked = false;
      });
    else if (mode === 1)
      allWarningLog.map((log) => {
        const curCheckbox = document.getElementById(
          `warningCheckbox-${log.id}`,
        );
        if (curCheckbox) curCheckbox.checked = false;
      });
    setSelectedIds([]);
  };
  const onSubmit = (e) => {
    if (selectedIds.length === 0) {
      alert('선택된 로그가 없습니다!');
      return;
    }
    const selectedIdsList = selectedIds.map((id) => `${id.id}`).join(', ');
    const isAgree = confirm(
      '선택된 로그들을 롤백 : \n ID = ' + selectedIdsList,
    );
    if (isAgree === false) return;
    if (mode === 1) {
      selectedIds.map((id) => {
        putWarningLogRollback({ id: id.id })
          .then((res) => {
            if (res.status !== 200)
              //error handle
              console.log(res);
            else {
              setSelectedIds([]);
              mutateUsers();
              //reFetchWarningLog();
              mutateWarningLogs();
              toast.success('로그를 롤백했습니다.');
            }
          })
          .catch((e) => {
            console.log(e);
            /*
            
            const { data } = e.response;
            if (data && (data.code == 400 || data.code == 404))
              toast.error(data.message);
            */
          });
      });
    } else if (mode === 2) {
      selectedIds.map((id) => {
        putPointLogRollback({ id: id.id })
          .then((res) => {
            if (res.status !== 200)
              //error handle
              console.log(res);
            else {
              setSelectedIds([]);
              mutateUsers();
              setPointSize(1);
              mutatePointLogs();
              toast.success('로그를 롤백했습니다.');
            }
          })
          .catch((e) => {
            const { data } = e.response;
            if (data && data.code === 400) toast.error(data.message);
          });
      });
    }
    setIsRollback(false);
  };

  // 스크롤 위치 저장
  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤 이벤트
  const onScroll = useCallback((e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setScrollPosition(scrollTop);
    }
  }, []);

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
                setScrollPosition(0);
                setIsOnly(false);
                const checkbox = document.getElementById('isOnlyCheckbox');
                checkbox.checked = false;
                resetAllCheckbox();
              }}
              selected={m.key === mode}
            >
              {m.name}
            </ModeButton>
          ))}
        </ButtonWrapper>
      </TitleWrapper>
      <SubtitleWrapper>
        <ButtonWrapper>
          <Button
            onClick={(e) => {
              setIsRollback(!isRollback);
              if (isRollback === false) resetAllCheckbox();
            }}
          >
            {isRollback ? '취소' : '로그 롤백'}
          </Button>
          {isRollback ? (
            <Button
              style={{
                marginLeft: '10px',
                backgroundColor: 'tomato',
                justifySelf: 'flex-start',
              }}
              onClick={onSubmit}
            >
              제출
            </Button>
          ) : undefined}
        </ButtonWrapper>

        <fieldset align="right">
          <legend>
            <Label>
              {mode === 1 ? '차감 내역만 보기' : '사용 내역만 보기'}
              <input
                type="checkbox"
                id="isOnlyCheckbox"
                onClick={(e) => {
                  setIsOnly(e.target.checked);
                }}
              ></input>
            </Label>
            <label style={{ cursor: 'pointer' }}></label>
          </legend>
        </fieldset>
      </SubtitleWrapper>
      <Content>
        <Log state={true}>
          <label>
            <TextWrapper wrap={true}>
              {isRollback ? <div style={{ width: '20px' }}></div> : ''}
              <Id mode={mode}>ID</Id>
              <Name>노션 아이디</Name>
              <Date>날짜</Date>
            </TextWrapper>
          </label>
          <TextWrapper>
            <LogMsg>사유</LogMsg>
            <Value>n</Value>
          </TextWrapper>
        </Log>

        <LogList
          key={mode === 1 ? allWarningLog : allPointLog}
          mode={mode}
          curLogList={mode === 1 ? allWarningLog : allPointLog}
          isOnly={isOnly}
          users={users}
          isRollback={isRollback}
          setSelectedIds={setSelectedIds}
          selectedIds={selectedIds}
          scrollPosition={scrollPosition}
          onScroll={onScroll}
        />
        <Button
          onClick={() => {
            if (mode === 1) {
              setWarningSize((prev) => prev + 1);
            } else {
              setPointSize((prev) => prev + 1);
            }
          }}
        >
          더 보기
        </Button>
      </Content>
    </Card>
  );
}

export default ShowAllUserLogs;
