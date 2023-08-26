import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px;
`;

export const Title = styled.div`
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
`;

export const SliderWrapper = styled.div`
  padding: 30px 20px 70px 20px;
`;
