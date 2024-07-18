import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  width: 100%;
  padding: 20px 15px;
  gap: 10px;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 0;
  & span {
    color: #7e7e7e;
    font-size: 14px;
    font-weight: 700;
    margin-right: 5px;
  }
`;

export const ProblemDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #676767;
  font-size: 15px;
  font-weight: 600;
`;

export const ProblemTitle = styled.div`
  font-weight: 700;
  color: #000;
  margin-left: 10px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    font-size: 18px;
    font-weight: 300;
  }
`;
