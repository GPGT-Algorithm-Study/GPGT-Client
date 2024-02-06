import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px;
  overflow: auto;
`;
export const StreakTitle = styled.div`
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

export const MaxStreak = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text-gray);
  > span {
    color: #000;
  }
`;
export const StreakInfoText = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-gray);
  > span {
    color: #000;
  }
`;
