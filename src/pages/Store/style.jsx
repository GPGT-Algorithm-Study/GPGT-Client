import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Item = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2rem;
  gap: 0.8rem;
  box-sizing: border-box;
  width: 20%;
  @media all and (max-width: 1190px) {
    width: 30%;
  }
  @media all and (max-width: 790px) {
    width: calc(50% - 1rem);
  }
  @media all and (max-width: 558px) {
    width: 100%;
  }
  & div {
    margin-bottom: 10px;
  }
`;

export const IconWrapper = styled.div`
  font-size: 2.8rem;
`;

export const ItemName = styled.div`
  font-weight: bold;
`;

export const Point = styled.div`
  font-size: 1rem;
  font-weight: 500;
  & span {
    color: var(--color-point);
  }
`;

export const PointWrapper = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  padding-left: 0.5rem;
  & span {
    color: var(--color-point);
  }
`;

export const Button = styled.button`
  font-size: 0.85rem;
  font-weight: 400;
  background-color: var(--color-button-gray);
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  margin-top: -0.8rem;
`;

export const Description = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-gray);
  text-align: center;
  width: 150px;
  line-height: 1.2;
  word-break: keep-all;
  & div {
    margin-top: 7px;
  }
`;

export const MyItemTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  width: 100%;
  border-top: 1px solid #e0e0e0;
  padding-top: 2.2rem;
`;
