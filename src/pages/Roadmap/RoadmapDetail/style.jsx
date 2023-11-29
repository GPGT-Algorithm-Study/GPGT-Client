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

export const ProgressBarWrapper = styled.div`
  width: 30%;
`;

export const WeekWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  overflow-x: auto;
  gap: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Week = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.selected ? '#fff' : '#3e3e3e')};
  ${(props) => props.selected && 'background-color: var(--color-primary)'};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 10px;
`;

export const ContentDiv = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProblemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
