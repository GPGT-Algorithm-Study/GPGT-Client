import styled from '@emotion/styled';
import { MentionsInput } from 'react-mentions';

export const CommentInfo = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  width: 100%;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid var(--color-border);
`;

export const StyledMentionsInput = styled(MentionsInput)`
  padding: 10px 9px;
  background-color: var(--color-input);
  border-radius: 7px;
  flex-grow: 1;
  & strong {
    background: var(--color-mention);
  }

  & textarea {
    height: 44px;
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
  margin-top: 15px;
  gap: 7px;
  width: 100%;
  & input {
    border: none;
    background-color: var(--color-input);
    border-radius: 7px;
    height: 40px;
    margin-bottom: 10px;
    padding: 10px 0 10px 20px;
    box-sizing: border-box;
    flex-grow: 1;
  }
  & button {
    height: 40px;
    padding: 0 25px;
    border: none;
    background-color: var(--color-primary);
    border-radius: 7px;
    color: white;
    cursor: pointer;
  }
`;

export const CommentList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-sizing: border-box;
  > div {
    border-bottom: 1px solid var(--color-border);
  }
  > :last-child {
    border-bottom: none;
  }
`;

export const ReplyButton = styled.div`
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--color-textgrey);
  margin-bottom: 1rem;
  font-weight: normal;
`;

export const ReplyList = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px 0 0 10px;
  box-sizing: border-box;
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

export const CommentWrapper = styled.div`
  background-color: white;
  padding: 2rem 0.7rem;
  box-sizing: border-box;
`;

export const MentionWrapper = styled.div`
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 0.9rem;
  ${(props) => props.focus && 'background-color:var(--color-background);'}
`;

export const InputWrapper = styled.div`
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
`;

export const CommentInputInfo = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  width: 100%;
  padding: 1rem 0.5rem;
`;

export const NoComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10rem;
  font-size: 0.9rem;
  color: var(--color-text-gray);
`;

export const ReplyMentionInputWrapper = styled.div`
  margin-top: 2rem;
`;
