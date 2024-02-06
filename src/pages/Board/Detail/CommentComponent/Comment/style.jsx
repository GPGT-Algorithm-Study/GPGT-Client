import styled from '@emotion/styled';

export const WriteInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 0.5rem;
`;

export const Writer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
`;

export const CreateDate = styled.div`
  color: var(--color-text-gray);
  font-weight: 400;
`;

export const ReplyButton = styled.div`
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--color-text-gray);
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
  margin-top: 0.7rem;
  font-size: 0.9rem;
`;

export const ReplyWrapper = styled.div`
  margin-left: 20px;
  white-space: pre-line;
  line-height: 1.5;
  margin-top: 0.7rem;
  font-size: 0.9rem;
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  margin-left: 1rem;
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
