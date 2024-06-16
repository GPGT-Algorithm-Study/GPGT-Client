import styled, { css } from '@emotion/styled';
import { CommonCard, CommonButton } from 'style/commonStyle';

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ProcessTypeWrapper = styled.span`
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

export const ProcessType = styled.div`
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
  height: 2.5em;
  display: flex;
  gap: 10px;
  justify-content: end;
`;

export const DeleteButton = styled.div`
  height: auto;
  padding: 10px 20px;
  border: none;
  background-color: crimson;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
`;

export const Input = styled.input`
  height: auto;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  value: ${(props) => props.value};
`;

export const Container = styled.div`
  /* overflow: scroll; */
  padding-bottom: 50px;
`;

export const User = styled.div`
  width: 130px;
  display: flex;
  flex: 0 0 auto;
  padding: 10px 0 10px 0;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font: 0.9rem;
  & div {
    margin-bottom: 20px;
  }
`;

export const ComplaintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: start;
`;

export const Content = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #ffffff;
  color: #000000;
  font-size: 16px;
  white-space: pre-wrap;
  id: ${(props) => props.id};
  name: ${(props) => props.name};
  placeholder: ${(props) => props.placeholder};
  resize: ${(props) => (props.disabled ? 'none' : 'both')};
`;

export const SelectWrapper = styled.select`
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-weight: bold;
  font: 0.9rem;
  color: #000;
  appearance: none;
  cursor: pointer;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const OptionWrapper = styled.option`
  font-size: 16px;
  color: #000;
  background-color: #fff;
  padding: 10px;
`;

export const ComplaintDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  align-items: flex-start;
  font-size: 15px;

  & > div {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const TypeBadge = styled.span`
  padding: 1px 10px;
  border-radius: 4px;
  font-size: 13px;
  text-transform: uppercase;
  background-color: ${(props) => {
    switch (props.type) {
      case 'NEW_FUNCTION':
        return '#6666FF';
      case 'BUG':
        return '#CC3333';
      case 'PROBLEM':
        return '#FF3366';
      default:
        return '#999999';
    }
  }};
  color: #fff; // 흰색
`;

export const Badge = styled.span`
  padding: 1px 10px;
  border-radius: 4px;
  font-size: 13px;
  text-transform: uppercase;
  background-color: ${(props) => {
    switch (props.type) {
      case 'WAITING':
        return '#999999'; // 회색
      case 'PROCESSING':
        return '#99CCFF'; // 남색
      case 'DONE':
        return '#377e22'; // 초록색
      default:
        return '#777'; // 회색
    }
  }};
  color: #fff; // 흰색
`;
