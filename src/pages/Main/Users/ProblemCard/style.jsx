import styled from '@emotion/styled';
import { CommonCard } from 'commonStyle';

export const Card = styled(CommonCard)`
  flex: 0 0 auto;
  padding: 20px 20px 20px 20px;
`;

export const ProblemTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  & p {
    display: inline;
    margin-left: 5px;
  }
`;

export const ProblemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const TagWrapper = styled.div`
  margin-top: 15px;
  max-width: 260px;
  display: flex;
  flex-wrap: wrap;
`;

export const LanguageTag = styled.span`
  border-radius: 50px;
  color: white;
  font-weight: bold;
  padding: 5px 8px 3px 8px;
  font-size: 0.8rem;
  border: none;
  background-color: var(--color-checked);
  margin: 0px 5px 5px 0px;
  text-overflow: 'clip';
`;

export const Tag = styled.span`
  border-radius: 50px;
  font-weight: normal;
  padding: 5px 8px 3px 8px;
  font-size: 0.8rem;
  border: none;
  background-color: var(--color-background);
  margin: 0px 5px 5px 0px;
`;
