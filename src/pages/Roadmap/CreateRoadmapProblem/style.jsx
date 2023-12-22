import styled from '@emotion/styled';
import { IoArrowBackSharp } from 'react-icons/io5';

export const TitleDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  > button {
    flex-shrink: 0;
    padding: 11px 20px;
    color: #fff;
    font-weight: 600;
    border-radius: 50px;
    background: var(--color-primary);
    border: none;
    cursor: pointer;
  }
`;

export const BackButton = styled(IoArrowBackSharp)`
  color: var(--color-textgrey);
  cursor: pointer;
  margin-bottom: 15px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  gap: 15px;
`;

export const ContentDiv = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WeekInfo = styled.div`
  display: flex;
  gap: 1rem;
  > label {
    margin-top: 10px;
    width: 70px;
    font-size: 17px;
    font-weight: 600;
  }
`;

export const ProblemList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 17px;
  > form {
    display: flex;
    align-items: center;
    gap: 7px;
    > input {
      width: 100%;
      border: 1px solid var(--color-unchecked);
      padding: 10px;
      box-sizing: border-box;
      border-radius: 7px;
    }
    > button {
      width: 70px;
      padding: 10px;
      box-sizing: border-box;
      border: none;
      background-color: var(--color-primary);
      border-radius: 7px;
      color: white;
      cursor: pointer;
    }
  }
`;

export const WeekAddButton = styled.div`
  margin-top: 30px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  > div {
    color: #6f6f6f;
    font-size: 32px;
    font-weight: 500;
  }
`;
