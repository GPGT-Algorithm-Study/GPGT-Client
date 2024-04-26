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

export const ComplaintItem = styled.div`
  //display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1rem 0;
  row-gap: 0.8rem;
  cursor: pointer;
  &:hover .hover-to-detail {
    display: block;
  }
`;

export const ComplaintInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--color-text-gray);
  padding: 0.4rem 0;
`;
export const ComplaintContent = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 430px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  > div {
    border-bottom: 1px solid #e0e0e0;
  }
  > :last-child {
    border-bottom: none;
  }
`;

export const ComplaintTitle = styled.div`
  color: var(--color-deep-gray);
  font-size: 0.9rem;
  align-items: center;
  gap: 0.5rem;
  & span {
    font-weight: 600;
    margin-right: 0.3rem;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  padding: 0.2rem 0;
`;
