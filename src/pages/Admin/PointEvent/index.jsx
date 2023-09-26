import React, { useState } from 'react';
import {
  Button,
  Card,
  FormWrapper,
  InputWrapper,
  TextWrapper,
  Title,
  TitleWrapper,
} from './style';
import Modal from 'layouts/Modal';
import { postPointEvent } from 'api/event';
import { toast } from 'react-toastify';

function NewEventModal({}) {
  const [newEventInfo, setNewEventInfo] = useState({});
  const onInfoChange = (e) => {
    const { name, value } = e.target;

    setNewEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      [name]: value,
    }));
  };
  const onInfoSubmit = (e) => {
    const EventInfo = {
      eventName: newEventInfo.eventName,
      description: newEventInfo.description,
      startTime: newEventInfo.startTime.concat(':00.000'),
      endTime: newEventInfo.endTime.concat(':00.000'),
      percentage: newEventInfo.percentage,
    };
    if (new Date(EventInfo.startTime) >= new Date(EventInfo.endTime)) {
      alert('이벤트 시작 시간은 종료 시간 이전이어야 합니다.');
      return;
    }

    if (isNaN(EventInfo.percentage) || EventInfo.percentage.charAt(0) === '.') {
      alert('포인트 추가율 퍼센트는 실수형태여야 합니다.');
      return;
    }
    const isAgree = confirm(
      `신규 이벤트 등록 : \n이벤트 이름 : ${EventInfo.eventName}\n이벤트 설명 : ${EventInfo.description}\n이벤트 시작 시간 : ${EventInfo.startTime}\n이벤트 종료 시간 : ${EventInfo.endTime}\n포인트 추가율 : ${EventInfo.percentage}\n 위와 같이 신규 이벤트를 등록할까요?`,
    );
    console.log(EventInfo);
    if (!isAgree) return;
    postPointEvent(EventInfo)
      .then((res) => {
        if (res.code !== 200) console.log(res.data.message);
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code === 400) toast.error(data.message);
      });
    setNewEventInfo({});
  };
  return (
    <div>
      <Title>신규 이벤트 등록</Title>
      <FormWrapper>
        <InputWrapper>
          <TextWrapper>이벤트 이름</TextWrapper>
          <input
            type="text"
            name="eventName"
            value={newEventInfo.eventName || ''}
            onChange={onInfoChange}
          />
        </InputWrapper>
        <InputWrapper>
          <TextWrapper>이벤트 설명</TextWrapper>
          <input
            type="text"
            name="description"
            value={newEventInfo.description || ''}
            onChange={onInfoChange}
          />
        </InputWrapper>
        <InputWrapper>
          <TextWrapper>이벤트 시작 시간</TextWrapper>
          <input
            type="datetime-local"
            name="startTime"
            value={newEventInfo.startTime || ''}
            onChange={onInfoChange}
          />
        </InputWrapper>

        <InputWrapper>
          <TextWrapper>이벤트 종료 시간</TextWrapper>
          <input
            type="datetime-local"
            name="endTime"
            value={newEventInfo.endTime || ''}
            onChange={onInfoChange}
          />
        </InputWrapper>

        <InputWrapper>
          <TextWrapper>포인트 추가율</TextWrapper>
          <input
            type="text"
            name="percentage"
            value={newEventInfo.percentage || ''}
            onChange={onInfoChange}
          />
        </InputWrapper>
      </FormWrapper>
      <Button onClick={() => console.log(newEventInfo)}>check</Button>
      <Button onClick={onInfoSubmit} style={{ backgroundColor: 'orange' }}>
        등록
      </Button>
    </div>
  );
}

function PointEvent() {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const onClickNewEventButton = () => {
    setShowNewEventModal(true);
  };

  return (
    <Card>
      <TitleWrapper>
        <Title>포인트 이벤트</Title>
      </TitleWrapper>
      <Button onClick={onClickNewEventButton} style={{ fontSize: '0.1rem' }}>
        신규 이벤트 등록
      </Button>
      <div>
        <Modal
          key="NewEventModal"
          show={showNewEventModal}
          onCloseModal={() => {
            setShowNewEventModal(false);
          }}
        >
          <NewEventModal />
        </Modal>
      </div>
    </Card>
  );
}

export default PointEvent;
