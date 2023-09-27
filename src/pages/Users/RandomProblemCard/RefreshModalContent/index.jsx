import React, { useCallback } from 'react';
import { Container, ButtonWrapper } from './style';
import { CommonButton } from 'style/commonStyle';
import { rerollRandomProblem } from 'api/user';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

/**
 * 랜덤 문제 새로고침 확인 창
 */
function RefreshModalContent({ onCloseModal, fetchProblem, changePoint }) {
  const user = useSelector((state) => state.user);
  const refreshProblem = useCallback(() => {
    rerollRandomProblem({ bojHandle: user.bojHandle })
      .then(() => {
        fetchProblem();
        onCloseModal();
        changePoint(-5);
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response.data.message);
        }
      });
  }, []);

  return (
    <Container>
      <div>
        <b>5 </b>
        <span>P</span> 를 사용하여 오늘의 랜덤 문제를 다시 추천 받을 수
        있습니다. <br />
        진행하시겠습니까?
      </div>
      <ButtonWrapper>
        <CommonButton width="30%" primary onClick={refreshProblem}>
          확인
        </CommonButton>
        <CommonButton width="30%" onClick={onCloseModal}>
          취소
        </CommonButton>
      </ButtonWrapper>
    </Container>
  );
}

export default RefreshModalContent;
