import styled from '@emotion/styled';
import { CommonButton } from 'style/commonStyle';

export const CategoryWrapper = styled.span`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

export const FormItem = styled.div`
  font-weight: bold;
  & input {
    width: 100%;
    border: 1px solid var(--color-unchecked);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 7px;
  }
`;

export const Category = styled.div`
  border-radius: 50px;
  background-color: ${(props) =>
    props.selected ? 'var(--color-primary)' : 'white'};
  color: ${(props) => (props.selected ? 'white' : '')};
  font-weight: normal;
  cursor: pointer;
  padding: 8px 15px 8px 15px;
  font-size: 0.9rem;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 30px;
  padding: 0 5px 0 5px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: end;
`;

export const Button = styled(CommonButton)`
  background-color: ${(props) =>
    props.primary ? 'var(--color-primary)' : 'var(--color-tag)'};
  font-size: 1rem;
  font-weight: normal;
`;

export const Container = styled.div`
  overflow: scroll;
`;
