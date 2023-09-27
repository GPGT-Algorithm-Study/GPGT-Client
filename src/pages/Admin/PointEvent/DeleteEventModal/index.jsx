import React, { useEffect, useState } from 'react';
import {
  Button,
  FormWrapper,
  InputWrapper,
  Text,
  TextWrapper,
  Title,
} from './style';
import useFetch from 'hooks/useFetch';
import {
  deletePointEvent,
  getAllPointEvents,
  getValidPointEvents,
} from 'api/event';
import { toast } from 'react-toastify';

function EventInfo({ eventInfo, setEventInfo, reFetchEvents }) {
  if (!eventInfo.eventName) return <div>해당 이벤트가 없습니다.</div>;
  const [isModify, setIsModify] = useState(false);
  const [currentEventInfo, setCurrentEventInfo] = useState({ ...eventInfo });

  useEffect(() => {
    console.log(currentEventInfo);
  }, [currentEventInfo, isModify]);

  //------삭제 api 호출 함수 시작------/
  const onClickDelete = (e) => {
    const isAgree = confirm('해당 이벤트를 삭제하시겠습니까?');
    if (!isAgree) return;
    const params = { eventId: eventInfo.id };
    deletePointEvent(params)
      .then((res) => {
        if (res.code !== 200) console.log(res.data.message);
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code === 400) toast.error(data.message);
      });
    setEventInfo({});
    reFetchEvents();
  };
  //------삭제 api 호출 함수 끝------/

  const onClickModify = (e) => {
    if (isModify) {
      setCurrentEventInfo({ ...eventInfo });
    }
    setIsModify(!isModify);
    setEventInfo({ ...eventInfo });
    console.log(eventInfo);
    console.log(currentEventInfo);
  };

  //------수정 api 호출 함수 시작------/
  const onSubmitModify = (e) => {
    const newEventInfo = {
      id: eventInfo.id,
      eventName: eventInfo.eventName,
      description: eventInfo.description,
      startTime: eventInfo.startTime,
      endTime: eventInfo.endTime,
      percentage: eventInfo.percentage,
    };
    const startDate = new Date(newEventInfo.startTime);
    const endDate = new Date(newEventInfo.endTime);
    if (startDate >= endDate) {
      alert('이벤트 시작 시간은 종료 시간 이전이어야 합니다.');
      return;
    }

    if (
      isNaN(newEventInfo.percentage) ||
      newEventInfo.percentage.charAt(0) === '.'
    ) {
      alert('포인트 추가율 퍼센트는 실수형태여야 합니다.');
      return;
    }

    console.log(newEventInfo);
    const isAgree = confirm(
      `${newEventInfo.id}번 이벤트 수정: \n이벤트 이름 : ${newEventInfo.eventName}\n이벤트 설명 : ${newEventInfo.description}\n이벤트 시작 시간 : ${newEventInfo.startTime}\n이벤트 종료 시간 : ${newEventInfo.endTime}\n추가율 : ${newEventInfo.percentage}`,
    );
    if (!isAgree) return;
  };
  //------수정 api 호출 함수 끝------//

  return (
    <div style={{ marginTop: '20px' }}>
      <TextWrapper>
        <Text>이벤트 이름 :</Text>
        <Text
          contentEditable={isModify}
          style={{ border: isModify ? '1px solid #ccc' : 'none' }}
          onInput={(e) => (currentEventInfo.eventName = e.target.innerText)}
        >
          {currentEventInfo.eventName}
        </Text>
      </TextWrapper>
      <TextWrapper>
        <Text>이벤트 설명 : </Text>
        <Text
          contentEditable={isModify}
          style={{ border: isModify ? '1px solid #ccc' : 'none' }}
          onInput={(e) => (currentEventInfo.eventName = e.target.innerText)}
        >
          {currentEventInfo.description}
        </Text>
      </TextWrapper>
      <TextWrapper>
        <Text>이벤트 시작 시간 : </Text>
        {isModify ? (
          <input
            type="datetime-local"
            defaultValue={currentEventInfo.startTime}
            style={{ marginLeft: '10px' }}
            onInput={(e) =>
              (currentEventInfo.startTime = e.target.value.concat(':00'))
            }
          ></input>
        ) : (
          <Text>{currentEventInfo.startTime}</Text>
        )}
      </TextWrapper>
      <TextWrapper>
        <Text>이벤트 종료 시간 : </Text>
        {isModify ? (
          <input
            type="datetime-local"
            defaultValue={currentEventInfo.endTime}
            style={{ marginLeft: '10px' }}
            onInput={(e) =>
              (currentEventInfo.endTime = e.target.value.concat(':00'))
            }
          ></input>
        ) : (
          <Text>{currentEventInfo.endTime}</Text>
        )}
      </TextWrapper>
      <TextWrapper>
        <Text>추가율 : </Text>
        <Text
          contentEditable={isModify}
          style={{ border: isModify ? '1px solid #ccc' : 'none' }}
          onInput={(e) => (currentEventInfo.percentage = e.target.innerText)}
        >
          {currentEventInfo.percentage}
        </Text>
      </TextWrapper>
      <Button
        style={{
          marginTop: '20px',
          marginRight: '100px',
          backgroundColor: 'crimson',
          color: 'white',
        }}
        onClick={onClickDelete}
      >
        삭제
      </Button>

      {/* 수정 기능 작업중!!! 
      <Button
        style={{
          marginTop: '20px',
          backgroundColor: 'orange',
          color: 'white',
          marginLeft: '10px',
        }}
        onClick={onClickModify}
      >
        {isModify ? '취소' : '수정'}
      </Button>
      <Button
        style={{ marginLeft: '10px' }}
        onClick={() => console.log(eventInfo)}
        hidden={isModify ? false : true}
      >
        제출
      </Button> */}
    </div>
  );
}

function DeleteEventModal({ reFetchEvents }) {
  const [targetId, setTargetId] = useState('');
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [events] = useFetch(getAllPointEvents, []);
  const [eventInfo, setEventInfo] = useState({});
  return (
    <div>
      <Title>이벤트 삭제</Title>
      <TextWrapper>이벤트 ID 입력</TextWrapper>
      <FormWrapper>
        <InputWrapper>
          <input
            type="text"
            name="id"
            value={targetId}
            onChange={(e) => {
              if (isNaN(e.target.value) === true) {
                alert('숫자만 입력해주세요.');
              } else setTargetId(Number(e.target.value));
            }}
          />
          <Button
            style={{ marginLeft: '10px', backgroundColor: 'light-gray' }}
            onClick={(e) => {
              setShowEventInfo(true);
              let isValid = false;
              events.map((event) => {
                if (event.id === targetId) {
                  setEventInfo(event);
                  isValid = true;
                }
              });
              if (!isValid) setEventInfo({});
            }}
          >
            조회
          </Button>
        </InputWrapper>
      </FormWrapper>
      {showEventInfo ? (
        <EventInfo
          eventInfo={eventInfo}
          setEventInfo={setEventInfo}
          reFetchEvents={reFetchEvents}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default DeleteEventModal;
