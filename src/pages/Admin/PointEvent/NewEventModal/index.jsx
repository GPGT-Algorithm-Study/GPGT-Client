import { postPointEvent } from 'api/event';
import React, { useState } from 'react';
import { Button, FormWrapper, InputWrapper, TextWrapper, Title } from './style';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { EVT_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';

function NewEventModal() {
  const [newEventInfo, setNewEventInfo] = useState({});
  const { mutate: mutateEvents } = useSWR(
    `${EVT_PREFIX_URL}/point/all`,
    fetcher,
  );
  const onInfoChange = (e) => {
    const { name, value } = e.target;

    setNewEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      [name]: value,
    }));
  };
  const onInfoSubmit = (e) => {
    if (
      !newEventInfo.eventName ||
      newEventInfo.eventName === '' ||
      !newEventInfo.description ||
      newEventInfo.description === '' ||
      !newEventInfo.startTime ||
      newEventInfo.startTime === '' ||
      !newEventInfo.endTime ||
      newEventInfo.endTime === '' ||
      !newEventInfo.percentage ||
      newEventInfo.percentage === ''
    ) {
      toast.error('입력되지 않은 정보가 있습니다.');
      return;
    }
    const EventInfo = {
      eventName: newEventInfo.eventName,
      description: newEventInfo.description,
      startTime: newEventInfo.startTime.concat(':00.000'),
      endTime: newEventInfo.endTime.concat(':00.000'),
      percentage: newEventInfo.percentage,
    };
    const startDate = new Date(EventInfo.startTime);
    const endDate = new Date(EventInfo.endTime);
    if (startDate >= endDate) {
      alert('이벤트 시작 시간은 종료 시간 이전이어야 합니다.');
      return;
    }

    if (
      isNaN(EventInfo.percentage) ||
      EventInfo.percentage.charAt(0) === '.' ||
      EventInfo.percentage.charAt(EventInfo.percentage.length - 1) === '.'
    ) {
      alert('포인트 추가율 퍼센트는 실수형태여야 합니다.');
      return;
    }
    const isAgree = confirm(
      `신규 이벤트 등록 : \n이벤트 이름 : ${EventInfo.eventName}\n이벤트 설명 : ${EventInfo.description}\n이벤트 시작 시간 : ${EventInfo.startTime}\n이벤트 종료 시간 : ${EventInfo.endTime}\n포인트 추가율 : ${EventInfo.percentage}\n 위와 같이 신규 이벤트를 등록할까요?`,
    );
    if (!isAgree) return;
    postPointEvent(EventInfo)
      .then((res) => {
        if (res.code !== 200) console.log(res.data.message);
        toast.success('이벤트를 새로 등록했습니다.');
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code === 400) toast.error(data.message);
      });
    setNewEventInfo({});
    mutateEvents();
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
            style={{ border: '1px solid black' }}
          />
        </InputWrapper>
        <InputWrapper>
          <TextWrapper>이벤트 설명</TextWrapper>
          <input
            type="text"
            name="description"
            value={newEventInfo.description || ''}
            onChange={onInfoChange}
            style={{ border: '1px solid black' }}
          />
        </InputWrapper>
        <InputWrapper>
          <TextWrapper>이벤트 시작 시간</TextWrapper>
          <input
            type="datetime-local"
            name="startTime"
            value={newEventInfo.startTime || ''}
            onChange={onInfoChange}
            style={{ border: '1px solid black' }}
          />
        </InputWrapper>

        <InputWrapper>
          <TextWrapper>이벤트 종료 시간</TextWrapper>
          <input
            type="datetime-local"
            name="endTime"
            value={newEventInfo.endTime || ''}
            onChange={onInfoChange}
            style={{ border: '1px solid black' }}
          />
        </InputWrapper>

        <InputWrapper>
          <TextWrapper>포인트 추가율</TextWrapper>
          <input
            type="text"
            name="percentage"
            value={newEventInfo.percentage || ''}
            onChange={onInfoChange}
            style={{ border: '1px solid black' }}
          />
        </InputWrapper>
      </FormWrapper>

      <Button
        onClick={onInfoSubmit}
        style={{
          backgroundColor: 'green',
          color: 'white',
          fontWeight: 'bold',
          marginTop: '15px',
        }}
      >
        등록
      </Button>
    </div>
  );
}

export default NewEventModal;
