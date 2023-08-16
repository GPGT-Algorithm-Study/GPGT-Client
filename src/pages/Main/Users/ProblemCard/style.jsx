import styled from '@emotion/styled';

export const Card = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 7px;
  width: var(--width-usercard);
  padding: 20px 20px 20px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
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
  max-width: 220px;
  display: flex;
  flex-wrap: wrap;
`;

export const LanguageTag = styled.span`
  border-radius: 50px;
  color: white;
  font-weight: bold;
  padding: 3px 8px 3px 8px;
  font-size: 0.8rem;
  border: none;
  background-color: var(--color-checked);
  margin: 0px 5px 5px 0px;
  text-overflow: 'clip';
`;

export const Tag = styled.span`
  border-radius: 50px;
  font-weight: normal;
  padding: 3px 8px 3px 8px;
  font-size: 0.8rem;
  border: none;
  background-color: var(--color-background);
  margin: 0px 5px 5px 0px;
`;
