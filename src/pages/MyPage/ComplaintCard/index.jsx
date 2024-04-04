import React, { useState } from 'react';
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
import { COMPLAINT_REQUESTER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

/** 마이페이지 유저가 제출한 민원 목록 컴포넌트 */
function ComplaintCard({ userInfo, isUser }) {
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
  if (!isUser || !userInfo) return;
  const navigate = useNavigate();
  const { data: complaintList } = useSWR(
    `${COMPLAINT_REQUESTER_PREFIX_URL}/all`,
    fetcher,
  );
  const total = complaintList ? complaintList.length : 0;
  return (
    <Card>
      <Title>
        💢 내 민원 목록{' '}
        <span>{total} 개의 민원 | 민원을 클릭하여 수정할 수 있습니다.</span>
      </Title>
      {/* TODO : API 연결 */}
      {isEmpty(complaintList) ? (
        <NoPosts>제출한 민원이 없습니다.</NoPosts>
      ) : (
        <ComplaintContent>
          {complaintList.map((complaint) => {
            return (
              <ComplaintItem
                key={complaint.id}
                onClick={() => {
                  navigate(`/complaint`, { state: { complaint } });
                }}
              >
                <ComplaintTitle style={{ fontWeight: 'bold' }}>
                  [{getKrComplaintTypeName(complaint.complaintType)}]
                </ComplaintTitle>
                <ComplaintTitle>{complaint.content}</ComplaintTitle>
                <ComplaintInfo>
                  <div>
                    {dayjs(complaint.createdDate).format('YYYY. MM. DD')}
                  </div>
                  <div>·</div>
                  <div>{getKrProcessTypeName(complaint.processType)}</div>
                </ComplaintInfo>
              </ComplaintItem>
            );
          })}
        </ComplaintContent>
      )}
    </Card>
  );
}

export default ComplaintCard;
