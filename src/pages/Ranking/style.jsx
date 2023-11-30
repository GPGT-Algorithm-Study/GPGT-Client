import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RankInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 600;
  }
  > span {
    color: #676767;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const RankNumber = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-right: 15px;
`;
