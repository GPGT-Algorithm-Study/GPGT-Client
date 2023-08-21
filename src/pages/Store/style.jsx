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
  align-items: center;
  width: 30%;
  margin: 0 5px 40px 5px;
  @media all and (max-width: 660px) {
    width: calc(50% - 10px);
  }
  @media all and (max-width: 342px) {
    width: 100%;
  }
  & div {
    margin-bottom: 12px;
  }
`;

export const ItemName = styled.div`
  font-weight: bold;
`;

export const Point = styled.div`
  font-size: 0.9rem;
  & span {
    color: var(--color-point);
    font-weight: bold;
  }
`;

export const Title = styled.div`
  display: flex;
  font-weight: bold;
  margin-bottom: 50px;
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
