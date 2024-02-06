import styled from '@emotion/styled';
import { MentionsInput } from 'react-mentions';

export const StyledMentionsInput = styled(MentionsInput)`
  padding: 0.7rem 9px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  width: 100%;
  font-size: 0.9rem;
  height: 5rem;
  box-sizing: border-box;
  & strong {
    background: var(--color-mention);
  }

  & textarea {
    height: 44px;
    font-size: 0.9rem;
    padding: 9px 10px !important;
    outline: none !important;
    border-radius: 7px !important;
    resize: none !important;
    line-height: 22px;
    border: none;
  }

  & ul {
    border: 1px solid lightgray;
    max-height: 200px;
    overflow-y: auto;
    padding: 9px 10px;
    background: white;
    border-radius: 4px;
    width: 150px;
  }
`;

export const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 7px;
  width: 100%;
  & button {
    font-size: 0.9rem;
    font-weight: 400;
    background-color: var(--color-button-gray);
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
  }
`;

export const MentionWrapper = styled.div`
  padding: 10px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.8rem;
  ${(props) => props.focus && 'background-color:var(--color-background);'}
`;
