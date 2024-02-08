import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  position: relative;
  flex-wrap: nowrap;
  width: calc(50% - 0.5rem);
  max-height: 20rem;
  box-sizing: border-box;
  @media all and (max-width: 800px) {
    width: 100%;
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 15rem;
  column-gap: 2rem;
  row-gap: 3rem;
  padding: 0 1rem;
  padding-bottom: 2.5rem;
  box-sizing: border-box;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media all and (max-width: 400px) {
    column-gap: 1rem;
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  margin-top: 25px;
`;

export const User = styled.div`
  width: 130px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
`;

export const Title = styled.div`
  font-weight: 600;
  padding: 1rem;
`;
