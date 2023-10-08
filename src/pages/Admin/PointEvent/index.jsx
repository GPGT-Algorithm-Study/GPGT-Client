import React, { useState } from 'react';
import {
  Button,
  ButtonWrapper,
  Card,
  DateWrapper,
  Event,
  EventDescription,
  EventWrapper,
  FormWrapper,
  Id,
  InputWrapper,
  Name,
  TextWrapper,
  Title,
  TitleWrapper,
  Value,
} from './style';
import Modal from 'layouts/Modal';
import { getAllPointEvents, postPointEvent } from 'api/event';
import { toast } from 'react-toastify';
import useFetch from 'hooks/useFetch';
import NewEventModal from './NewEventModal';
import DeleteEventModal from './DeleteEventModal';

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`;
}

// 예시: formatDateTime('2023-09-26T15:30:00Z')
// 결과: '2023-09-26, 15:30:00'

function PointEvent() {
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const onClickNewEventButton = () => {
    setShowNewEventModal(true);
  };
  const onClickDeleteEventButton = () => {
    setShowDeleteEventModal(true);
  };
  const [events, reFetchEvents] = useFetch(getAllPointEvents, []);

  return (
    <Card eventCnt={events.length}>
      <TitleWrapper>
        <Title>포인트 이벤트</Title>
      </TitleWrapper>
      <ButtonWrapper>
        <Button
          onClick={onClickNewEventButton}
          style={{
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'green',
            fontSize: '12px',
            marginBottom: '10px',
          }}
        >
          이벤트 추가
        </Button>
        <Button
          onClick={onClickDeleteEventButton}
          style={{
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'crimson',
            fontSize: '12px',
            marginBottom: '10px',
            marginLeft: '10px',
          }}
        >
          이벤트 편집
        </Button>
      </ButtonWrapper>
      <EventWrapper>
        <Event>
          <TextWrapper>
            <Id>ID</Id>
            <Name>이벤트 이름</Name>
            <DateWrapper>시작 시간</DateWrapper>
            <DateWrapper>종료 시간</DateWrapper>
          </TextWrapper>
          <EventDescription>이벤트 설명</EventDescription>
          <Value>%</Value>
        </Event>
        {events.map((event) => {
          return (
            <>
              <Event key={event.id}>
                <TextWrapper>
                  <Id>{event.id}</Id>
                  <Name>{event.eventName}</Name>
                  <DateWrapper>{formatDateTime(event.startTime)}</DateWrapper>
                  <DateWrapper>{formatDateTime(event.endTime)}</DateWrapper>
                </TextWrapper>
                <EventDescription>{event.description}</EventDescription>
                <Value>x{event.percentage}</Value>
              </Event>
            </>
          );
        })}
      </EventWrapper>
      <div>
        <Modal
          key="NewEventModal"
          show={showNewEventModal}
          onCloseModal={() => {
            setShowNewEventModal(false);
            reFetchEvents();
          }}
        >
          <NewEventModal reFetchEvents={reFetchEvents} />
        </Modal>
      </div>
      <div>
        <Modal
          key="DeleteEventModal"
          show={showDeleteEventModal}
          onCloseModal={() => {
            setShowDeleteEventModal(false);
            reFetchEvents();
          }}
        >
          <DeleteEventModal events={events} reFetchEvents={reFetchEvents} />
        </Modal>
      </div>
    </Card>
  );
}

export default PointEvent;
