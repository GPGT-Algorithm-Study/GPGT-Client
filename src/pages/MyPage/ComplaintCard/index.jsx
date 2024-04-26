<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> cf60f2b816d220c402114aa4c82ae91654bfa486
import {
  Card,
  ComplaintContent,
  ComplaintInfo,
  ComplaintItem,
  ComplaintTitle,
  NoPosts,
  Title,
} from './style';
import useSWR from 'swr';
import { getMyComplaint } from 'api/complaint';
import { isEmpty } from 'lodash';
<<<<<<< HEAD
import {
  COMPLAINT_REQUESTER_PREFIX_URL,
  USER_PREFIX_URL,
} from 'utils/constants';
=======
import { COMPLAINT_REQUESTER_PREFIX_URL } from 'utils/constants';
>>>>>>> cf60f2b816d220c402114aa4c82ae91654bfa486
import fetcher from 'utils/fetcher';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
<<<<<<< HEAD
import { getUserInfo } from 'api/user';
=======
>>>>>>> cf60f2b816d220c402114aa4c82ae91654bfa486

function getKrComplaintTypeName(complaintType) {
  if (complaintType === 'NEW_FUNCTION') return '신규 기능 건의';
  if (complaintType === 'BUG') return '버그 제보';
  if (complaintType === 'PROBLEM') return '문제점';
  else return '기타';
}
function getKrProcessTypeName(processType) {
  if (processType === 'WAITING') return '대기중';
  if (processType === 'PROCESS') return '처리중';
  if (processType === 'DONE') return '처리 완료';
}
/** 마이페이지 유저가 제출한 민원 목록 컴포넌트 */
function ComplaintCard({ userInfo, isUser }) {
  const navigate = useNavigate();
  const { data: complaintList } = useSWR(
    `${COMPLAINT_REQUESTER_PREFIX_URL}/all`,
    fetcher,
  );
<<<<<<< HEAD
  const { data: allUserInfo } = useSWR(`${USER_PREFIX_URL}/info/all`, fetcher);
=======
>>>>>>> cf60f2b816d220c402114aa4c82ae91654bfa486
  if (!isUser || !userInfo) return;
  const total = complaintList ? complaintList.length : 0;
  return (
    <Card>
      <Title>
<<<<<<< HEAD
        💢 내 민원 목록 <span>{total} 개의 민원</span>
      </Title>
      <Title>
        <span>
          마우스 커서를 올려 자세히 보거나, 클릭하여 수정할 수 있습니다.
        </span>
=======
        💢 내 민원 목록{' '}
        <span>{total} 개의 민원 · 민원을 클릭하여 수정할 수 있습니다.</span>
>>>>>>> cf60f2b816d220c402114aa4c82ae91654bfa486
      </Title>
      {/* TODO : API 연결 */}
      {isEmpty(complaintList) ? (
        <NoPosts>제출한 민원이 없습니다.</NoPosts>
      ) : (
        <ComplaintContent>
          {complaintList.map((complaint) => {
<<<<<<< HEAD
            const processor = allUserInfo?.find(
              (u) => u.bojHandle === complaint.processor,
            )?.notionId;
=======
>>>>>>> cf60f2b816d220c402114aa4c82ae91654bfa486
            return (
              <ComplaintItem
                key={complaint.id}
                onClick={() => {
                  if (complaint.processType === 'WAITING')
                    navigate(`/complaint`, { state: { complaint } });
                  else if (complaint.processType === 'PROCESS')
                    toast.error('이미 처리중인 민원입니다.');
                  else toast.error('이미 처리 완료된 민원입니다.');
                }}
              >
                <ComplaintTitle style={{ fontWeight: 'bold' }}>
                  [{getKrComplaintTypeName(complaint.complaintType)}]
                </ComplaintTitle>
<<<<<<< HEAD
                <ComplaintTitle className="hover-to-detail">
                  {complaint.content}
                </ComplaintTitle>
=======
                <ComplaintTitle>{complaint.content}</ComplaintTitle>
>>>>>>> cf60f2b816d220c402114aa4c82ae91654bfa486
                <ComplaintInfo>
                  <div>
                    {dayjs(complaint.createdDate).format('YYYY. MM. DD')}
                  </div>
                  <div>·</div>
<<<<<<< HEAD
                  <div>{processor ? processor : '-'}</div>
                  <div>·</div>
                  <div>{getKrProcessTypeName(complaint.processType)}</div>
                </ComplaintInfo>
                {complaint.reply ? (
                  <ComplaintTitle className="hover-to-detail">
                    [REPLY] <br />
                    <p style={{ fontStyle: 'italic' }}>{complaint.reply}</p>
                  </ComplaintTitle>
                ) : undefined}
=======
                  <div>{getKrProcessTypeName(complaint.processType)}</div>
                </ComplaintInfo>
>>>>>>> cf60f2b816d220c402114aa4c82ae91654bfa486
              </ComplaintItem>
            );
          })}
        </ComplaintContent>
      )}
    </Card>
  );
}

export default ComplaintCard;
