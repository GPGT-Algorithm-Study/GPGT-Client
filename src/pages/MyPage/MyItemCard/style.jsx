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
  border-radius: 50px;
  padding: 10px 20px 10px 20px;
  border: none;
  background-color: var(--color-background);
  color: black;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
  :disabled {
    color: var(--color-textgrey);
  }
`;

export const NoItem = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 40px 0;
  color: var(--color-textgrey);
`;

export const CommentTitle = styled.div`
  margin-bottom: 15px;
  font-weight: bold;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const CommentButton = styled.div`
  width: 70px;
  border-radius: 50px;
  padding: 10px 20px 10px 20px;
  border: none;
  background-color: ${(props) =>
    props.isConfirm ? 'var(--color-primary)' : 'var(--color-background)'};
  color: ${(props) => (props.isConfirm ? 'white' : 'black')};
  margin: 0 10px 0 10px;
  cursor: pointer;
`;

export const Input = styled.textarea`
  width: 100%;
  height: 120px;
  resize: none;
  overflow: auto;
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
