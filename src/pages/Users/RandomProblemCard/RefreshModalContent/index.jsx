import React, { useCallback } from 'react';
import { Container, ButtonWrapper, Button } from './style';
import { rerollRandomProblem } from 'api/user';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';

/**
 * 랜덤 문제 새로고침 확인 창
 */
function RefreshModalContent({ onCloseModal, changePoint }) {
  const COST = 5;
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  // 유저의 랜덤 문제
  const { mutate: mutateProblem } = useSWR(
    loginUser
      ? `${USER_PREFIX_URL}/streak/streak?bojHandle=${loginUser.claim}`
      : null,
    fetcher,
  );
  const refreshProblem = useCallback(() => {
    rerollRandomProblem({ bojHandle: loginUser.claim })
      .then(() => {
        mutateProblem();
        onCloseModal();
        if (changePoint) {
          changePoint(-COST);
        }
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
        <b>{COST}</b>
        <span>P</span> 를 사용하여 오늘의 랜덤 문제를
        <br />
        다시 추천 받으시겠습니까? <br />
      </div>
      <ButtonWrapper>
        <Button width="30%" primary onClick={refreshProblem}>
          확인
        </Button>
        <Button width="30%" onClick={onCloseModal}>
          취소
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

export default RefreshModalContent;
