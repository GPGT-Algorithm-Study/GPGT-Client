import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  @media all and (min-width: 1440px) {
    width: calc(33% - 1px);
  }

  @media all and (min-width: 1180px) and (max-width: 1440px) {
    width: calc(33% - 1px);
  }

  @media all and (min-width: 784px) and (max-width: 1180px) {
    width: calc(50% - 13px);
  }

  @media all and (max-width: 784px) {
    width: calc(100% - 3px);
  }
  display: flex;
  padding: 20px 27px;
  gap: 10px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  cursor: pointer;
`;

export const TitleDiv = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 19px;
  margin-top: 10px;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  > div {
    border-radius: 50px;
    font-weight: normal;
    padding: 5px 8px 3px 8px;
    font-size: 0.8rem;
    border: none;
    background-color: var(--color-background);
    margin: 0px 5px 5px 0px;
  }
`;

export const ProgressBarWrapper = styled.div`
  width: 60%;
`;
