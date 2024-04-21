import styled from '@emotion/styled';
import { CommonCard, CommonTitle } from 'style/commonStyle';
export const Card = styled(CommonCard)`
  padding: 20px;
`;
export const Author = styled(CommonTitle)`
  font-weight: normal;
`;

export const ContentArea = styled.textarea`
  width: calc(100% - 40px);
  border: solid 1px lightgray;
  border-radius: 8px;
  padding: 20px;
`;
