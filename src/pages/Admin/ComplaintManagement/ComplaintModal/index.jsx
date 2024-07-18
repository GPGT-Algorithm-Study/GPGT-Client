import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import {
  deleteComplaint,
  updateComplaint,
  updateComplaintType,
} from 'api/complaint';
import { Button } from 'pages/Admin/PointEvent/DeleteEventModal/style';
import { CommonFlexWrapper, CommonProfileImage } from 'style/commonStyle';
import {
  User,
  ComplaintWrapper,
  Input,
  Content,
  ProcessType,
  ProcessTypeWrapper,
  DeleteButton,
  ButtonWrapper,
  SelectWrapper,
  OptionWrapper,
  ComplaintDetails,
  RowWrapper,
  Badge,
  TypeBadge,
  SemiTitle,
  StateWrapper,
} from './style';
import { Complaint } from '../style';
import { complaintProcessingType } from 'utils/complaint';
import PageTitle from 'components/PageTitle';

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

function ComplaintModal(props) {
  const complaint = props.complaint;
  const requesterInfo = props.requesterInfo;
  const [submitLock, setSubmitLock] = useState(false);
  const [deleteLock, setDeleteLock] = useState(false);
  const [processTypes, setProcessTypes] = useState([
    complaintProcessingType.WAITING,
    complaintProcessingType.PROCESSING,
    complaintProcessingType.DONE,
  ]);
  const [selectedProcessType, setSelectedProcessType] = useState(
    complaint.processType,
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const processor = e.target[0].value;
    const reply = e.target[1].value;

    const updatedComplaint = {
      id: complaint.id,
      processType: selectedProcessType,
      processor: processor,
      reply: reply,
    };
    if (complaint.processType === 'WAITING') {
      if (isEmpty(updatedComplaint.processor)) {
        toast.error('담당자를 선택해주세요.');
        return;
      } else if (updatedComplaint.processType === 'WAITING') {
        toast.error('처리 상태를 변경해주세요.');
        return;
      } else if (isEmpty(updatedComplaint.reply)) {
        toast.error('코멘트를 작성해주세요.');
        return;
      }
    } else {
      if (
        updatedComplaint.processType === complaint.processType &&
        updatedComplaint.processor === complaint.processor &&
        updatedComplaint.reply === complaint.reply
      ) {
        toast.error('변경사항이 없습니다.');
        return;
      }
    }
    setSubmitLock(true);
    updateComplaintType(updatedComplaint)
      .then((res) => {
        toast.success(`민원을 성공적으로 처리하였습니다.`);
        props.closeModal();
      })
      .catch((err) => {
        toast.error(`민원 처리에 실패하였습니다 : ${err.message}`);
      })
      .finally(() => {
        setSubmitLock(false);
      });
  };
  const onDeleteClick = (e) => {
    const isAgree = confirm('해당 민원을 정!말! 삭제하시겠습니까?');
    if (!isAgree) return;
    setDeleteLock(true);
    deleteComplaint({ id: complaint.id })
      .then((res) => {
        toast.success('민원을 성공적으로 삭제하였습니다.');
        props.closeModal();
      })
      .catch((err) =>
        toast.error('민원 삭제에 실패하였습니다. : ' + err.message),
      )
      .finally(() => {
        setDeleteLock(false);
      });
  };

  return (
    <ComplaintWrapper>
      <RowWrapper>
        <ComplaintDetails>
          <StateWrapper>
            <SemiTitle>ID &nbsp;&nbsp;</SemiTitle>{' '}
            <span>&nbsp;{complaint.id}</span>
          </StateWrapper>
          <StateWrapper>
            <SemiTitle>유형</SemiTitle>
            {'  '}
            <span>
              {
                <TypeBadge type={complaint.complaintType}>
                  {getKrComplaintTypeName(complaint.complaintType)}
                </TypeBadge>
              }
            </span>
          </StateWrapper>
          <StateWrapper>
            <SemiTitle>상태</SemiTitle>
            {'  '}
            <span>
              {
                <Badge type={complaint.processType}>
                  {getKrProcessTypeName(complaint.processType)}
                </Badge>
              }
            </span>
          </StateWrapper>
          <StateWrapper>
            <SemiTitle>담당</SemiTitle>
            {'  '}
            <span>{complaint.processor ? complaint.processor : '-'}</span>
          </StateWrapper>
        </ComplaintDetails>
        <User key={requesterInfo.notionId}>
          <div>
            {requesterInfo.notionId} {requesterInfo.emoji}
          </div>
          <CommonProfileImage
            width="50"
            height="50"
            src={
              requesterInfo.profileImg != 'null'
                ? requesterInfo.profileImg
                : 'https://static.solved.ac/misc/360x360/default_profile.png'
            }
            onClick={(e) => onClickProfileImg(e, requesterInfo.bojHandle)}
            style={{ cursor: 'pointer' }}
          ></CommonProfileImage>
        </User>
      </RowWrapper>
      <PageTitle title="민원" />
      <Content disabled={true} defaultValue={complaint.content}></Content>
      <PageTitle title="답변" />
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <ProcessTypeWrapper>
            {processTypes.map((type, index) => (
              <ProcessType
                key={index}
                selected={type.key == selectedProcessType}
                onClick={() => {
                  setSelectedProcessType(type.key);
                }}
              >
                {type.label}
              </ProcessType>
            ))}
            <div>
              <SelectWrapper
                name="processor"
                defaultValue={complaint.processor ? complaint.processor : ''}
              >
                <OptionWrapper value="" disabled hidden>
                  담당자 선택
                </OptionWrapper>
                <OptionWrapper value="seyeon0207">양세연</OptionWrapper>
                <OptionWrapper value="fin">김성민</OptionWrapper>
                <OptionWrapper value="asdf016182">장희영</OptionWrapper>
                <OptionWrapper value="emforhs0315">조성훈</OptionWrapper>
              </SelectWrapper>
            </div>
          </ProcessTypeWrapper>
        </div>
        <Content
          name="reply"
          id="reply"
          placeholder="코멘트 작성.."
          defaultValue={complaint.reply}
        ></Content>
        <ButtonWrapper>
          <DeleteButton onClick={onDeleteClick}>삭제</DeleteButton>
          <Input type="submit" value={'작성'}></Input>
        </ButtonWrapper>
      </form>
    </ComplaintWrapper>
  );
}

export default ComplaintModal;
