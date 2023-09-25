import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 15px;
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

export const Post = styled(CommonCard)`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  padding: 20px 15px 20px 15px;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
  gap: 10px;
  :hover {
    transform: ${(props) =>
      props.isInvite ? '' : 'scale3d(1.01, 1.01, 1.01)'};
    box-shadow: ${(props) =>
      props.isInvite ? '' : '2px 4px 16px rgba(0, 0, 0, 0.16);'};
  }
  width: 100%;
  /* @media all and (min-width: 1024px) {
    width: calc(25% - 10px);
  }

  @media all and (min-width: 761px) and (max-width: 1024px) {
    width: calc(33% - 10px);
  }

  @media all and (min-width: 446px) and (max-width: 761px) {
    width: calc(50% - 10px);
  }

  @media all and (max-width: 446px) {
    width: calc(100%);
  } */
`;

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

export const PageWrapper = styled.div`
  margin: 35px 0 30px 0;
  display: flex;
  justify-content: center;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: end;
  border-bottom: 1px solid var(--color-bordergrey);
  color: var(--color-textgrey);
  & input {
    background-color: transparent;
    padding: 10px 10px 5px 10px;
    border: none;
  }
`;

export const WriteButton = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50px;
  cursor: pointer;
  position: fixed;
  bottom: 25px;
  right: 25px;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
`;

export const Writer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 1rem;
`;

export const PostInfo = styled.td`
  color: var(--color-textgrey);
`;
