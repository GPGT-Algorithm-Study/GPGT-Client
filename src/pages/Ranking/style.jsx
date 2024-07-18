import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const RankInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
  }
  > span {
    color: var(--color-text-gray);
    font-weight: 500;
    font-size: 0.9rem;
    @media all and (max-width: 480px) {
      display: none;
    }
  }
`;

export const RankNumber = styled.div`
  font-weight: 600;
  margin-right: 13px;
  width: 23px;
`;

export const TopThreeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

export const NameInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  > span {
    font-size: 0.8rem;
    color: var(--color-text-gray);
    font-weight: 400;
  }
`;
