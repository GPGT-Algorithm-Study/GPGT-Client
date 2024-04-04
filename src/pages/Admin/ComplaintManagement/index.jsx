import React from 'react';
import {
  Card,
  Complaint,
  ComplaintWrapper,
  Content,
  Title,
  TitleWrapper,
} from './style';
import useSWR from 'swr';

function ComplaintManagement() {
  const { data: Complaints } = useSWR();
  return (
    <Card>
      <TitleWrapper>
        <Title>민원 관리</Title>
      </TitleWrapper>
      <Content>
        <ComplaintWrapper>
          <Complaint>민원들..</Complaint>
        </ComplaintWrapper>
      </Content>
    </Card>
  );
}

export default ComplaintManagement;
