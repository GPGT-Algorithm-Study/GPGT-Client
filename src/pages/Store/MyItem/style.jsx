import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 25px 25px 25px;
  & div {
    margin-bottom: 12px;
  }
`;

export const ItemName = styled.div`
  font-weight: bold;
`;

export const Left = styled.div`
  font-size: 0.9rem;
  color: var(--color-textgrey);
`;

export const Title = styled.div`
  font-weight: bold;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  font-size: 0.85rem;
  font-weight: 400;
  background-color: var(--color-button-gray);
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
  :disabled {
    color: var(--color-textgrey);
  }
`;

export const NoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text-gray);
  height: 8rem;
  font-size: 0.9rem;
`;

export const CommentTitle = styled.div`
  margin-bottom: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: start;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
`;

export const CommentButton = styled.button`
  border: none;
  padding: 0.7rem 2.5rem;
  background-color: var(--color-primary);
  margin-top: 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export const Input = styled.textarea`
  width: 100%;
  height: 120px;
  resize: none;
  overflow: auto;
  border: none;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  padding: 10px;
  box-sizing: border-box;
`;

export const ErrorMsg = styled.div`
  margin: 10px 0 10px 0;
  color: var(--color-error);
  font-size: 0.9rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
