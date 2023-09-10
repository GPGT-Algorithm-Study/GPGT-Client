import styled from '@emotion/styled';

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

export const Table = styled.table`
  border-collapse: collapse;
  /* background-color: white; */
  margin-top: 15px;
  width: 100%;
  /* 테이블 행 */
  & td {
    padding: 10px 15px 10px 15px;
    text-align: left;
    border-bottom: 1px solid var(--color-unchecked);
    cursor: pointer;
  }
  & th {
    text-align: left;
    padding: 15px;
    border-top: 1px solid var(--color-unchecked);
    border-bottom: 1px solid var(--color-border);
    font-weight: bold;
    cursor: none;
  }
  /* 테이블 비율 */
  & th:nth-child(1),
  & td:nth-child(1) {
    width: 60%;
    @media all and (max-width: 386px) {
      width: 50%;
    }
  }
  & th:nth-child(2),
  & td:nth-child(2) {
    width: 20%;
  }
  & th:nth-child(3),
  & td:nth-child(3) {
    width: 20%;
  }
  & th,
  & td {
    border-left: none;
    border-right: none;
  }
`;

export const BoardTitleWrapper = styled.div`
  display: flex;
  gap: 13px;
  flex-direction: column;
  & p {
    margin-left: 6px;
    color: var(--color-textgrey);
    font-size: 0.9rem;
    font-weight: bold;
  }
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
