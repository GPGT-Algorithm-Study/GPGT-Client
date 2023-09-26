import styled from '@emotion/styled';

export const Table = styled.table`
  border-collapse: collapse;
  /* background-color: white; */
  margin-top: 15px;
  width: 100%;
  font-size: 0.9rem;
  /* 테이블 행 */
  & td {
    padding: 10px 15px 10px 15px;
    text-align: left;
    border-bottom: 1px solid var(--color-bordergrey);
    cursor: pointer;
    & b {
      font-weight: bold;
    }
  }
  & th {
    text-align: left;
    padding: 15px;
    border-top: 2px solid var(--color-bordergrey);
    border-bottom: 1px solid var(--color-bordergrey);
    font-weight: bold;
    cursor: none;
  }
  /* 테이블 비율 */
  & th:nth-of-type(1),
  & td:nth-of-type(1) {
    width: 60%;
    @media all and (max-width: 544px) {
      width: 40%;
    }
  }
  & th:nth-of-type(2),
  & td:nth-of-type(2) {
    width: 15%;
    @media all and (max-width: 544px) {
      width: 20%;
    }
  }
  & th:nth-of-type(3),
  & td:nth-of-type(3) {
    width: 15%;
    @media all and (max-width: 544px) {
      width: 30%;
    }
  }
  & th,
  & td {
    border-left: none;
    border-right: none;
  }
`;

export const PostInfo = styled.td`
  color: var(--color-textgrey);
`;
