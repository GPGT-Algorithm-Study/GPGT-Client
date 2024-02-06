import styled from '@emotion/styled';

export const Title = styled.a`
  font-size: 1.2rem;
  font-weight: bold;
  & span {
    margin-left: 5px;
  }
`;

export const NoRecommend = styled.div`
  display: flex;
  height: 5rem;
  align-items: center;
  justify-content: center;
  color: var(--color-text-gray);
  font-size: 0.9rem;
`;
