import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';
import { MentionsInput } from 'react-mentions';

export const CommentInfo = styled.div`
  font-weight: bold;
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
`;

export const ReplyButton = styled.div`
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--color-textgrey);
  /* margin: 15px 10px 0 0; */
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

export const CommentWrapper = styled(CommonCard)`
  border-radius: 7px;
  background-color: white;
  padding: 15px;
  box-sizing: border-box;
`;

export const MentionWrapper = styled.div`
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 0.9rem;
  ${(props) => props.focus && 'background-color:var(--color-background);'}
`;
