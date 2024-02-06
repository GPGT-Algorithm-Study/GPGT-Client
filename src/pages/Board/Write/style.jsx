import styled from '@emotion/styled';
import { CommonButton } from 'style/commonStyle';

export const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CategoryWrapper = styled.span`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const FormItem = styled.div`
  font-weight: bold;
  & input {
    width: ${(props) => (props.width ? props.width : '100%')};
    border: 1px solid var(--color-unchecked);
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 7px;
  }
  & button {
    padding: 1rem 1.1rem;
    border: none;
    background-color: var(--color-button-gray);
    border-radius: 5px;
    color: var(--color-deep-gray);
    cursor: pointer;
    margin-left: 10px;
  }
`;

export const Category = styled.div`
  border-radius: 5px;
  background-color: ${(props) =>
    props.selected ? 'var(--color-primary)' : 'white'};
  color: ${(props) => (props.selected ? 'white' : 'var(--color-deep-gray)')};
  border: ${(props) =>
    props.selected ? 'none' : '1px solid var(--color-border)'};
  font-weight: 400;
  cursor: pointer;
  padding: 0.7rem 1.5rem;
  font-size: 0.8rem;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0 5px 0 5px;
  margin-top: 2rem;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: end;
`;

export const Button = styled.div`
  padding: 1rem 1.1rem;
  border: none;
  background-color: var(--color-primary);
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
`;

export const Container = styled.div`
  /* overflow: scroll; */
  padding-bottom: 50px;
`;
