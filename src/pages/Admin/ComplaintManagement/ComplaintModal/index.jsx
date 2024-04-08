import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { updateComplaint, updateComplaintType } from 'api/complaint';

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

  const onSubmit = (e) => {
    e.preventDefault();
    const processor = e.target[0].value;
    const processType = e.target[1].value;
    const reply = e.target[2].value;
    if (isEmpty(processor)) toast.error('담당자를 지정해주세요.');
    else if (processType === complaint.processType)
      toast.error('민원의 처리 상태를 변경해주세요.');
    else if (isEmpty(reply)) toast.error('코멘트를 작성해주세요.');
    else {
      const updatedComplaint = {
        id: complaint.id,
        processType: processType,
        processor: processor,
        reply: reply,
      };
      //console.info(updatedComplaint);
      /* TODO : API 연결 */
      updateComplaintType(updatedComplaint)
        .then((res) => {
          toast.success(`민원을 성공적으로 처리하였습니다.`);
          props.closeModal();
        })
        .catch((err) => {
          toast.error(`민원 처리에 실패하였습니다 : ${err.message}`);
        });
    }
  };

  return (
    <div>
      <p>
        작성자 : {requesterInfo.emoji} {requesterInfo.notionId}
      </p>
      <p>ID : {complaint.id}</p>
      <p>민원 유형 : {getKrComplaintTypeName(complaint.complaintType)}</p>
      <p>처리 상태 : {getKrProcessTypeName(complaint.processType)}</p>
      <p>담당자 : {complaint.processor ? complaint.processor : '-'}</p>
      <br />
      <p>내용</p>
      <p>{complaint.content}</p>
      <br />

      <form onSubmit={(e) => onSubmit(e)}>
        <input
          name="processor"
          placeholder={'담당자'}
          defaultValue={complaint.processor ? complaint.processor : undefined}
        />
        <div>
          <select name="type">
            <option
              value="WAITING"
              selected={complaint.processType === 'WAITING'}
            >
              대기중
            </option>
            <option
              value="PROCESSING"
              selected={complaint.processType === 'PROCESSING'}
            >
              처리중
            </option>
            <option value="DONE" selected={complaint.processType === 'DONE'}>
              처리 완료
            </option>
          </select>
        </div>
        <textarea
          row="10"
          name="reply"
          id="reply"
          placeholder="코멘트 작성.."
        ></textarea>
        <br />
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default ComplaintModal;
