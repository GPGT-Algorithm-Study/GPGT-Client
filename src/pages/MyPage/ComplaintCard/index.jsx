import React from 'react';
import { Card, NoPosts, Title } from './style';

/** 마이페이지 유저가 제출한 민원 목록 컴포넌트 */
function ComplaintCard({ userInfo, isUser }) {
  if (!isUser) return;
  return (
    <Card>
      <Title>💢 내 민원 목록</Title>
      {/* TODO : API 연결 */}
      <NoPosts>제출한 민원이 없습니다.</NoPosts>
    </Card>
  );
}

export default ComplaintCard;
