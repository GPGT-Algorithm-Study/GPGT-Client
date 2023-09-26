import React, { useState } from 'react';
import { Button, FormWrapper, InputWrapper, TextWrapper, Title } from './style';
import useFetch from 'hooks/useFetch';
import { getAllPointEvents, getValidPointEvents } from 'api/event';

function EventInfo({ eventInfo }) {
  return (
    <div
      style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}
    >
      <div>
        <TextWrapper>이벤트 이름 : </TextWrapper>
        {eventInfo.eventName}
        <TextWrapper>이벤트 설명 : </TextWrapper>
        {eventInfo.description}
        <TextWrapper>이벤트 시작 시간 : </TextWrapper>
        {eventInfo.startTime}
        <TextWrapper>이벤트 종료 시간 : </TextWrapper>
        {eventInfo.endTime}
        <TextWrapper>추가율 : </TextWrapper>
        {eventInfo.percentage}
      </div>
    </div>
  );
}

function DeleteEventModal({ reFetchEvents }) {
  const [targetId, setTargetId] = useState(0);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [events] = useFetch(getAllPointEvents, []);
  const [eventInfo, setEventInfo] = useState({});
  return (
    <div>
      <Title>이벤트 삭제</Title>
      <FormWrapper>
        <InputWrapper>
          <TextWrapper>이벤트 ID 입력..</TextWrapper>
          <input
            type="number"
            name="id"
            value={targetId}
            onChange={(e) => {
              setTargetId(Number(e.target.value));
            }}
          />
          <Button
            style={{ marginLeft: '10px' }}
            onClick={(e) => {
              setShowEventInfo(true);
              events.map((event) => {
                if (event.id === targetId) setEventInfo(event);
              });
            }}
          >
            조회
          </Button>
        </InputWrapper>
      </FormWrapper>
      {showEventInfo ? <EventInfo eventInfo={eventInfo} /> : <></>}
    </div>
  );
}

export default DeleteEventModal;
