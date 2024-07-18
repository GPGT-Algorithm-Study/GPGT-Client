import styled from '@emotion/styled';

export const TopWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  > button {
    flex-shrink: 0;
    padding: 11px 20px;
    color: #fff;
    font-weight: 600;
    border-radius: 5px;
    background: var(--color-primary);
    border: none;
    cursor: pointer;
  }
`;

export const BackButton = styled.div`
  color: var(--color-textgrey);
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
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
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
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

export const TitleDiv = styled.div`
  display: inline-flex;
  gap: 18px;
  align-items: center;
  cursor: pointer;
  > div {
    display: flex;
    gap: 12px;
    align-items: center;
    > span {
      color: var(--color-text-gray);
      font-size: 15px;
      font-weight: 400;
    }
  }
`;
