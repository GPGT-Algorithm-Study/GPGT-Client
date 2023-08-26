import styled from '@emotion/styled';

export const Label = styled.span`
  color: var(--color-textgrey);
  font-size: 0.8rem;
  font-weight: bold;
  & span {
    margin-right: 5px;
  }
`;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 35px;
  align-self: center;
`;

export const Input = styled.input`
  border: none;
  background-color: var(--color-background);
  border-radius: 7px;
  height: 40px;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px 0 10px 20px;
  box-sizing: border-box;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 7px;
  margin: auto;
  margin-top: 150px;
  background-color: white;
  width: 450px;
  height: 400px;
  max-width: 80%;
  padding: 0 80px 0 80px;
  @media all and (max-width: 400px) {
    padding: 0 20px 0 20px;
  }
`;

export const Button = styled.button`
  border: none;
  width: 100%;
  padding: 10px 0 10px 20px;
  background-color: var(--color-primary);
  height: 40px;
  margin-top: 20px;
  border-radius: 7px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export const ErrorMsg = styled.div`
  margin-top: 7px;
  color: var(--color-error);
  font-size: 0.9rem;
`;
