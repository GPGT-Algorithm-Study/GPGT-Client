import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Category = styled.div`
  border-radius: 50px;
  background-color: ${(props) =>
    props.selected ? 'var(--color-primary)' : 'var(--color-tag)'};
  color: ${(props) => (props.selected ? 'white' : '')};
  font-weight: ${(props) => (props.selected ? 'bold' : '')};
  cursor: pointer;
  padding: 9px 20px;
  font-size: 0.9rem;
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
  bottom: 45px;
  right: 45px;
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
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`;

export const Writer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 1rem;
`;

export const Container = styled.div`
  padding-bottom: 5px;
`;

export const Card = styled(CommonCard)`
  padding: 20px 20px 30px 20px;
  margin-top: 10px;
`;
