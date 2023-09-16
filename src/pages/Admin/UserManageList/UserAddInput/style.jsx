import styled from '@emotion/styled';
import { CommonCard, CommonButton } from 'style/commonStyle';

export const UserAddWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const MAX_WIDTH = '610px';

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  & div {
    display: flex;
    align-items: center;
    text-align: start;
    & span {
      margin-right: 8px;
      color: var(--color-textgrey);
      font-size: 0.9rem;
    }
  }
  @media all and (max-width: ${MAX_WIDTH}) {
    flex-direction: column;
    align-items: start;
  }
`;

export const Button = styled(CommonButton)`
  text-align: center;
  height: 10px;
  width: 40px;
  background-color: green;
  color: white;
  font-size: 1px;
  font-weight: hard;
  margin-right: 20px;
`;

export const FormWrapper = styled.div`
  display: relative;
`;

export const InputWrapper = styled.div`
  display: flex;
  padding: 5px;
`;
