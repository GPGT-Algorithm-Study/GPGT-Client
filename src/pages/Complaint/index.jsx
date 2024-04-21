import React from 'react';
import { CommonFlexWrapper, CommonTitle } from 'style/commonStyle';
import ComplaintInputForm from './ComplaintInputForm';

function Complaint() {
  return (
    <div>
      <CommonFlexWrapper>
        <CommonTitle>민원</CommonTitle>
      </CommonFlexWrapper>
      <br />
      <ComplaintInputForm />
    </div>
  );
}

export default Complaint;
