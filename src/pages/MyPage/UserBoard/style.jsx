import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px 20px 30px 20px;
`;

export const Title = styled.div`
  font-weight: 600;
  display: flex;
  gap: 0.5rem;
  align-items: end;
  margin-bottom: 1.5rem;
  & span {
    font-weight: normal;
    color: var(--color-text-gray);
    font-size: 0.8rem;
  }
`;
export const PageWrapper = styled.div`
  align-self: end;
  margin-top: 1.5rem;
`;

export const NoPosts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  color: var(--color-text-gray);
  font-size: 0.9rem;
`;

export const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    border-bottom: 1px solid #e0e0e0;
  }
  > :last-child {
    border-bottom: none;
  }
`;

export const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1.5rem 0;
  row-gap: 0.8rem;
  cursor: pointer;
`;

export const PostInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--color-text-gray);
`;

export const PostTitle = styled.div`
  color: var(--color-deep-gray);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & span {
    font-weight: 600;
    margin-right: 0.3rem;
  }
`;
