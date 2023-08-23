import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px 50px 20px 40px;
  margin-bottom: 7px;
  height: 100%;
`;

export const RankWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 10px 0;
`;
export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  .notion-id {
    margin-right: 10px;
    font-weight: bold;
    font-size: 1.1rem;
  }
  .boj-handle {
    color: var(--color-textlight);
    @media all and (max-width: 410px) {
      display: none;
    }
  }
`;

export const ScoreWrappeer = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;
