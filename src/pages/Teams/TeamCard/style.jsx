import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 2rem;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TeamInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
  row-gap: 1rem;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.5rem;
  max-width: 35%;
  box-sizing: border-box;
  border-right: 1px solid #e0e0e0;
  gap: 0.5rem;
  :last-child {
    border-right: none;
  }
  & div {
    font-size: 0.7rem;
    font-weight: 400;
    color: var(--color-text-gray);
  }
  & p {
    font-size: 1.1rem;
    color: var(--color-primary);
  }
`;

export const ContributorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 0 10px;
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

export const TeamInfoWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const TeamName = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
`;

export const TeamScoreInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  box-sizing: border-box;
  background-color: #fafbff;
  max-width: 100%;
  border-radius: 5px;
`;

export const MvpInfoWrapper = styled.div`
  border-top: 1px solid #e0e0e0;
  padding: 1rem 0;
`;

export const MvpTitle = styled.div`
  font-weight: 600;
  margin-bottom: 1.5rem;
`;
