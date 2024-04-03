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
  if (!isUser || !userInfo) return;
  const navigate = useNavigate();
  const { data: complaintList } = useSWR(
    `${COMPLAINT_REQUESTER_PREFIX_URL}/all`,
    fetcher,
  );
  console.info(complaintList);
  return (
    <Card>
      <Title>💢 내 민원 목록</Title>
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
                  [{complaint.complaintType}]
                </ComplaintTitle>
                <ComplaintTitle>{complaint.content}</ComplaintTitle>
                <ComplaintInfo>
                  <div>{complaint.processType}</div>
                  <div>·</div>
                  <div>
                    {dayjs(complaint.createdDate).format('YYYY. MM. DD')}
                  </div>
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
