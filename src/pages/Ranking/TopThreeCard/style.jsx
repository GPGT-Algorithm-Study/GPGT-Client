import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  @media all and (max-width: 1440px) and (min-width: 784px) {
    width: calc(33% - 10px);
  }
  @media all and (max-width: 784px) {
    width: calc(100% - 3px);
  }
  display: flex;
  padding: 30px 27px;
  gap: 10px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 230px;
  > div {
    font-size: 19px;
    font-weight: 600;
  }
  > span {
    color: #676767;
    font-size: 16px;
    font-weight: 500;
  }
`;
