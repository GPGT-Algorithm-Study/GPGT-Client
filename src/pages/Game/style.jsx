import styled from '@emotion/styled';
import { CommonButton } from 'style/commonStyle';

export const AppWrapper = styled.div`
  text-align: center;
`;

export const BoardWrapper = styled.div`
  display: inline-block;
  border: 2px solid #000;
`;

export const RowWrapper = styled.div`
  display: flex;
`;

export const CellWrapper = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) => (props.revealed ? '#ddd' : 'transparent')};
  ${(props) => props.flagged && 'background-color: #ff0;'}
  ${(props) => props.questioned && 'background-color: #e0e0e0;'}
`;

export const CellContent = styled.div`
  font-size: 1rem;
`;

export const ControlsWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Timer = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const RestartButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;
