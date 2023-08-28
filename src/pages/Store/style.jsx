import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
  padding-bottom: 20px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc(50% - 10px);
  margin: 0 5px 40px 5px;
  @media all and (max-width: 558px) {
    width: 100%;
  }
  & div {
    margin-bottom: 10px;
  }
`;

export const ItemName = styled.div`
  font-weight: bold;
`;

export const Point = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  & span {
    color: var(--color-point);
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 50px;
  & div {
    margin-left: 7px;
    color: var(--color-textgrey);
    font-size: 0.8rem;
  }
  & span {
    color: var(--color-point);
  }
`;

export const Button = styled.button`
  border-radius: 50px;
  padding: 10px 20px 10px 20px;
  border: none;
  background-color: var(--color-background);
  color: black;
  font-weight: bold;
  cursor: pointer;
`;

export const Description = styled.div`
  font-size: 0.9rem;
  color: var(--color-textgrey);
  width: 150px;
  line-height: 1.2;
  word-break: keep-all;
  & div {
    margin-top: 7px;
  }
`;
