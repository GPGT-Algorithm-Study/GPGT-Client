import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px 50px 0 40px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
  flex-wrap: wrap;
  padding-bottom: 20px;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 15px 10px;
  & p {
    font-size: 1.4rem;
    font-weight: bold;
    margin-top: 30px;
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

export const IconWrapper = styled.div`
  margin-top: -35px;
`;
