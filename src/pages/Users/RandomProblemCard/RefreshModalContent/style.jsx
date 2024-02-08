import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  & div {
    line-height: 1.4;
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--color-deep-gray);
    text-align: start;
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
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  border: ${(props) =>
    props.primary ? 'none' : '1px solid var(--color-border)'};
  background-color: ${(props) =>
    props.primary ? 'var(--color-primary)' : '#fff'};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  font-weight: ${(props) => (props.primary ? '' : 'bold')};
  cursor: pointer;
  font-size: 0.8rem;
  width: 50%;
`;
