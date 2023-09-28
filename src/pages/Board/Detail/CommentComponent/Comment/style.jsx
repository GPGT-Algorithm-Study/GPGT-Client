import styled from '@emotion/styled';

export const WriteInfo = styled.div`
  display: flex;
  column-gap: 7px;
  row-gap: 3px;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Writer = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export const CreateDate = styled.div`
  font-size: 0.8rem;
  color: var(--color-textgrey);
  font-weight: normal;
  margin-left: 7px;
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

export const CommentWrapper = styled.div`
  margin-bottom: 15px;
  white-space: pre-line;
  line-height: 1.5;
`;

export const ReplyWrapper = styled.div`
  margin-left: 20px;
  white-space: pre-line;
  line-height: 1.5;
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

export const Input = styled.input`
  border: none;
  background-color: var(--color-input);
  border-radius: 7px;
  height: 40px;
  margin-bottom: 10px;
  padding: 10px 0 10px 20px;
  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
`;

export const MentionName = styled.span`
  font-weight: bold;
  background-color: var(--color-mention);
  padding: 2px 5px;
  border-radius: 7px;
  font-size: 0.9rem;
`;
