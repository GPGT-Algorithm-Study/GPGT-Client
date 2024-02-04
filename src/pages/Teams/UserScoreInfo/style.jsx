import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-weight: 500;
  > span {
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--color-text-gray);
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ScoreInfo = styled.div`
  font-weight: 400;
  color: var(--color-text-gray);
  font-size: 0.9rem;
  > span {
    @media all and (max-width: 544px) {
      display: none;
    }
  }
`;
