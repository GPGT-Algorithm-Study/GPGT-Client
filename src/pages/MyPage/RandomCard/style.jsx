import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px;
`;

export const Title = styled.div`
  display: flex;
  font-weight: bold;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const EditButton = styled.div`
  color: var(--color-textgrey);
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 10px;
  background-color: var(--color-background);
  padding: 7px 12px 7px 12px;
  border-radius: 50px;
`;

export const NoDifficulty = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 40px 0;
  color: var(--color-textgrey);
  line-height: 1.2;
`;

export const SliderWrapper = styled.div`
  padding: 30px 20px 70px 20px;
`;

export const SwitchWrapper = styled.div`
  font-weight: normal;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--color-textgrey);
  margin: 0 0 10px 10px;
  & span {
    margin-right: 7px;
  }
`;

export const InfoWRapper = styled.span`
  display: flex;
  align-items: start;
`;
