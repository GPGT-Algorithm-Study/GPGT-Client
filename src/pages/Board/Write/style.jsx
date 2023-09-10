import styled from '@emotion/styled';
import { CommonButton } from 'style/commonStyle';

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const Category = styled.div`
  border-radius: 50px;
  background-color: ${(props) =>
    props.selected ? 'var(--color-primary)' : 'var(--color-tag)'};
  color: ${(props) => (props.selected ? 'white' : '')};
  font-weight: ${(props) => (props.selected ? 'bold' : '')};
  cursor: pointer;
  padding: 13px 25px 13px 25px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
