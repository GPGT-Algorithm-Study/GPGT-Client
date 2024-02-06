import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 1rem;
  margin-bottom: 7px;
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

export const ContributorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 30px 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
  & p {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const WinnerIcon = styled.div`
  margin-left: 7px;
  margin-bottom: -12px;
`;

export const UserPointWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-sizing: border-box;
  padding: 0 1rem 2rem 1rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 2rem;
  align-items: center;
  padding-left: 1rem;
`;

export const GraphDescription = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-gray);
  margin-top: 2rem;
`;
