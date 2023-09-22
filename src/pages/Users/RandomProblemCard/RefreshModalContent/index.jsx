import React from 'react';
import { Container, ButtonWrapper } from './style';
import { CommonButton } from 'style/commonStyle';

function RefreshModalContent({ onCloseModal }) {
  return (
    <Container>
      <div>
        <b>5</b>
        <span>P</span>를 사용하여 오늘의 랜덤 문제를 다시 추천 받을 수 있습니다.{' '}
        <br />
        진행하시겠습니까?
      </div>
      <ButtonWrapper>
        <CommonButton primary>확인</CommonButton>
        <CommonButton onClick={onCloseModal}>취소</CommonButton>
      </ButtonWrapper>
    </Container>
  );
}

export default RefreshModalContent;
