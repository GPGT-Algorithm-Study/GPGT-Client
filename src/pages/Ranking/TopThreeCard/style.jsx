import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  @media all and (min-width: 784px) {
    width: calc(33% - 10px);
  }
  @media all and (max-width: 784px) {
    width: calc(100% - 3px);
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0 2rem 2rem 2rem;
  gap: 10px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 230px;
  > span {
    color: var(--color-text-gray);
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

export const NameInfo = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-size: 1.1rem;
  > span {
    color: var(--color-text-gray);
    font-weight: 300;
    font-size: 0.8rem;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  padding: 1rem 0 0 1rem;
`;
