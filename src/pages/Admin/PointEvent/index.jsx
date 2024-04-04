import React, { useState } from 'react';
import {
  Button,
  ButtonWrapper,
  Card,
  DateWrapper,
  Event,
  EventDescription,
  EventWrapper,
  Id,
  Name,
  TextWrapper,
  Title,
  TitleWrapper,
  Value,
} from './style';
import Modal from 'layouts/Modal';
import NewEventModal from './NewEventModal';
import DeleteEventModal from './DeleteEventModal';
import fetcher from 'utils/fetcher';
import { EVT_PREFIX_URL } from 'utils/constants';
import useSWR from 'swr';
import { Content } from '../PointManage/style';

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
  const { data: events, mutate: mutateEvents } = useSWR(
    `${EVT_PREFIX_URL}/point/all`,
    fetcher,
  );

  if (!events) return null;

  return (
    <Card eventCnt={events.length}>
      <TitleWrapper>
        <Title>포인트 이벤트</Title>
      </TitleWrapper>
      <Content>
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
            <br />
            <TextWrapper>
              <EventDescription>이벤트 설명</EventDescription>
              <Value>%</Value>
            </TextWrapper>
          </Event>
          {events.map((event) => {
            return (
              <div key={event.id}>
                <Event>
                  <TextWrapper>
                    <Id>{event.id}</Id>
                    <Name>{event.eventName}</Name>
                    <DateWrapper>{formatDateTime(event.startTime)}</DateWrapper>
                    <DateWrapper>{formatDateTime(event.endTime)}</DateWrapper>
                  </TextWrapper>
                  <TextWrapper>
                    <EventDescription>{event.description}</EventDescription>
                    <Value>x{event.percentage}</Value>
                  </TextWrapper>
                </Event>
              </div>
            );
          })}
        </EventWrapper>
        <div>
          <Modal
            key="NewEventModal"
            show={showNewEventModal}
            onCloseModal={() => {
              setShowNewEventModal(false);
              mutateEvents();
            }}
          >
            <NewEventModal />
          </Modal>
        </div>
        <div>
          <Modal
            key="DeleteEventModal"
            show={showDeleteEventModal}
            onCloseModal={() => {
              setShowDeleteEventModal(false);
              mutateEvents();
            }}
          >
            <DeleteEventModal />
          </Modal>
        </div>
      </Content>
    </Card>
  );
}

export default PointEvent;
