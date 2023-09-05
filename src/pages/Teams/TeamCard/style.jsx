import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px 50px 0 40px;
  margin-bottom: 10px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
  padding-bottom: 10px;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7px 10px 0 10px;
  & div {
    font-size: 0.8rem;
    font-weight: bold;
    border-bottom: 3px solid;
    border-color: ${(props) =>
      props.team == 0 ? 'var(--color-team0)' : 'var(--color-team1)'};
  }
  & p {
    font-weight: bold;
    font-size: 1.4rem;
    margin-top: 20px;
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
  margin-top: -36px;
`;
