import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  @media all and (min-width: 1440px) {
    width: calc(25% - 10px);
  }

  @media all and (min-width: 1180px) and (max-width: 1440px) {
    width: calc(25% - 10px);
  }

  @media all and (min-width: 784px) and (max-width: 1180px) {
    width: calc(30%);
  }

  @media all and (min-width: 420px) and (max-width: 784px) {
    width: calc(50% - 10px);
  }
  @media all and (max-width: 420px) {
    width: calc(100%);
  }
  padding: 20px 27px;
  gap: 10px;
  box-sizing: border-box;
  min-height: 160px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProblemIdDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--color-text-gray);
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  > div {
    margin-bottom: 3px;
  }
`;

export const ProblemTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 15px;
`;

export const SolvedIconWrapper = styled.div`
  flex-grow: 1;
  text-align: end;
`;

export const ProblemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
