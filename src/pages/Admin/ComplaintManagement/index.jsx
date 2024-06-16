import React, { Suspense, useState } from 'react';
import {
  ButtonWrapper,
  Card,
  Complaint,
  ComplaintContent,
  ComplaintWrapper,
  Content,
  DateWrapper,
  Id,
  ModeButton,
  Name,
  TextWrapper,
  Title,
  TitleWrapper,
} from './style';
import useSWR from 'swr';
import {
  COMPLAINT_PROCESSOR_PREFIX_URL,
  USER_PREFIX_URL,
} from 'utils/constants';
import fetcher from 'utils/fetcher';
import { getUserInfo } from 'api/user';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Modal from 'layouts/Modal';
import ComplaintModal from './ComplaintModal';

function getKrComplaintTypeName(complaintType) {
  if (complaintType === 'NEW_FUNCTION') return '신규 기능 건의';
  if (complaintType === 'BUG') return '버그 제보';
  if (complaintType === 'PROBLEM') return '문제점';
  else return '기타';
}
function getKrProcessTypeName(processType) {
  if (processType === 'WAITING') return '대기중';
  if (processType === 'PROCESSING') return '처리중';
  if (processType === 'DONE') return '처리 완료';
}

function ComplaintManagement() {
  const [mode, setMode] = useState(-1);
  const onClickModeButton = (m) => {
    mode === m ? setMode(-1) : setMode(m);
  };
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState({});
  const onClickComplaint = (complaint) => {
    setCurrentComplaint(complaint);
    setShowComplaintModal(true);
  };
  const { data: complaints, mutate: mutateComplaints } = useSWR(
    `${COMPLAINT_PROCESSOR_PREFIX_URL}/all`,
    fetcher,
  );
  const { data: userInfo } = useSWR(`${USER_PREFIX_URL}/info/all`, fetcher);
  if (!complaints || !userInfo) {
    return (
      <Card>
        <TitleWrapper>
          <Skeleton width="80%" />
        </TitleWrapper>
        <Content>
          <ComplaintWrapper>
            <Skeleton width="80%" />
          </ComplaintWrapper>
        </Content>
      </Card>
    );
  }
  return (
    <Card>
      <TitleWrapper>
        <Title>민원 관리</Title>
        <ButtonWrapper>
          <ModeButton
            onClick={() => onClickModeButton(0)}
            selected={mode === -1}
          >
            전체
          </ModeButton>
          <ModeButton
            onClick={() => onClickModeButton(0)}
            selected={mode === 0}
          >
            대기중
          </ModeButton>
          <ModeButton
            onClick={() => onClickModeButton(1)}
            selected={mode === 1}
          >
            진행중
          </ModeButton>
          <ModeButton
            onClick={() => onClickModeButton(2)}
            selected={mode === 2}
          >
            완료
          </ModeButton>
        </ButtonWrapper>
      </TitleWrapper>
      <Content>
        <ComplaintWrapper>
          <Complaint>
            <TextWrapper>
              <Id>ID</Id>
              <Name>요청인 이름</Name>
              <DateWrapper>등록 날짜</DateWrapper>
              <DateWrapper>유형</DateWrapper>
            </TextWrapper>
            <TextWrapper>
              <ComplaintContent>내용</ComplaintContent>
            </TextWrapper>
            <TextWrapper>
              <DateWrapper>상태</DateWrapper>
              <DateWrapper>담당자</DateWrapper>
            </TextWrapper>
          </Complaint>
          {complaints.map((complaint) => {
            const requester = userInfo.find(
              (user) => user.bojHandle === complaint.requester,
            );
            const createdDate = new Date(complaint.createdDate);
            const type = complaint.processType;
            if (
              mode === -1 ||
              (mode === 0 && type === 'WAITING') ||
              (mode === 1 && type === 'PROCESSING') ||
              (mode === 2 && type === 'DONE')
            )
              return (
                <Complaint
                  key={complaint.id}
                  onClick={() => onClickComplaint(complaint)}
                  style={{ cursor: 'pointer' }}
                >
                  <TextWrapper>
                    <Id>{complaint.id}</Id>
                    <Name>{requester.notionId}</Name>
                    <DateWrapper>{`${createdDate.toLocaleDateString()}  ${createdDate
                      .toTimeString()
                      .substring(0, 8)}`}</DateWrapper>
                    <DateWrapper>
                      [{getKrComplaintTypeName(complaint.complaintType)}]
                    </DateWrapper>
                  </TextWrapper>
                  <TextWrapper>
                    <ComplaintContent>{complaint.content}</ComplaintContent>
                  </TextWrapper>
                  <TextWrapper>
                    <DateWrapper>
                      [{getKrProcessTypeName(complaint.processType)}]
                    </DateWrapper>
                    <DateWrapper>
                      {complaint.processor ? complaint.processor : '-'}
                    </DateWrapper>
                  </TextWrapper>
                </Complaint>
              );
          })}
        </ComplaintWrapper>
      </Content>
      <Modal
        key={'ComplaintModal'}
        show={showComplaintModal}
        onCloseModal={() => {
          setShowComplaintModal(false);
          mutateComplaints();
        }}
      >
        <ComplaintModal
          complaint={currentComplaint}
          requesterInfo={userInfo.find(
            (user) => currentComplaint.requester === user.bojHandle,
          )}
          closeModal={() => {
            setShowComplaintModal(false);
            mutateComplaints();
          }}
        />
      </Modal>
    </Card>
  );
}

export default ComplaintManagement;
