import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & div {
    line-height: 1.5;
    & b {
      font-weight: bold;
    }
    & span {
      font-weight: bold;
      color: var(--color-point);
    }
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 5px;
  width: 100%;
`;
