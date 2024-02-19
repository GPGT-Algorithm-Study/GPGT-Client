import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px 20px 30px 20px;
`;

export const Title = styled.div`
  font-weight: 600;
  display: flex;
  gap: 0.5rem;
  align-items: end;
  margin-bottom: 1.5rem;
  & span {
    font-weight: normal;
    color: var(--color-text-gray);
    font-size: 0.8rem;
  }
`;

export const NoItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  color: var(--color-text-gray);
  font-size: 0.9rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-gray);
  text-align: center;
  width: 150px;
  line-height: 1.2;
  word-break: keep-all;
  & div {
    margin-top: 7px;
  }
`;
export const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  gap: 1rem;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  gap: 0.8rem;
  box-sizing: border-box;
  & div {
    margin-bottom: 10px;
  }
`;

export const IconWrapper = styled.div`
  font-size: 2.3rem;
`;

export const ItemName = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
`;

export const CommentTitle = styled.div`
  margin-bottom: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: start;
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

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
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

export const Button = styled.button`
  font-size: 0.8rem;
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

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
`;
