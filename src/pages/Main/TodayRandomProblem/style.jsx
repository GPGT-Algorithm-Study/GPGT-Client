import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Card = styled(CommonCard)`
  flex: 0 0 auto;
  padding: 20px 20px 20px 20px;
  width: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  align-items: center;
  & p {
    display: inline;
    color: var(--color-point);
  }
`;

export const TagSwitchWrapper = styled.div`
  font-weight: normal;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: var(--color-deep-gray);
  gap: 0.5rem;
  > span {
    margin-top: 1px;
  }
`;

export const ProblemTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

export const ProblemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 2rem 1rem;
`;

export const TagWrapper = styled.div`
  max-width: 480px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
`;

export const Tag = styled.span`
  border-radius: 50px;
  font-weight: normal;
  padding: 5px 10px;
  font-size: 0.8rem;
  border: none;
  background-color: var(--color-button-gray);
  text-overflow: 'ellipsis';
`;

export const ProblemNumber = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  color: var(--color-deep-gray);
  > div {
    margin-bottom: 4px;
  }
`;

export const ProblemSubInfo = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  color: var(--color-deep-gray);
  font-size: 0.8rem;
  & span {
    color: #000;
    font-weight: 600;
  }
`;
