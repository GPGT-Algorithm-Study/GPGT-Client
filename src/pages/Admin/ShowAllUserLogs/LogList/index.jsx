import { useEffect, useRef } from 'react';
import {
  Date,
  Id,
  Log,
  LogMsg,
  LogWrapper,
  Name,
  TextWrapper,
  Value,
} from '../style';
import dayjs from 'dayjs';

export default function LogList({
  mode,
  curLogList,
  isOnly,
  users,
  isRollback,
  setSelectedIds,
  selectedIds,
  scrollPosition,
  onScroll,
}) {
  const onSelect = (e) => {
    const { name, value, checked } = e.target;
    if (!checked) {
      setSelectedIds(selectedIds.filter((user) => user.id !== value));
    } else {
      const newUser = { [name]: value };
      setSelectedIds(selectedIds.concat(newUser));
    }
  };

  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <LogWrapper ref={scrollRef} onScroll={onScroll}>
      {curLogList.map((log, index) => {
        const thisUser =
          users && users.find((u) => u.bojHandle === log.bojHandle);
        if (isOnly === true && log.changedValue >= 0) return;
        return (
          <Log state={log.state} key={index}>
            <label style={{ display: 'flex' }}>
              <input
                type="checkbox"
                id={
                  mode === 1
                    ? `warningCheckbox-${log.id}`
                    : `pointCheckbox-${log.id}`
                }
                name="id"
                value={log.id}
                onChange={onSelect}
                style={{
                  display: isRollback === true ? '' : 'none',
                }}
              ></input>
              <TextWrapper wrap={true}>
                <Id mode={mode}>{log.id}.</Id>
                <Name>{thisUser?.notionId}</Name>
                <Date>{dayjs(log.createdDate).format('M월D일 HH:mm:ss')}</Date>
              </TextWrapper>
            </label>
            <TextWrapper wrap={false}>
              <LogMsg>{log.description}</LogMsg>
              <Value plus={log.changedValue >= 0} mode={mode}>
                {log.changedValue >= 0 ? '+' : '-'}
                {Math.abs(log.changedValue)}
              </Value>
            </TextWrapper>
          </Log>
        );
      })}
    </LogWrapper>
  );
}
