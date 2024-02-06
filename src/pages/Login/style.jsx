import styled from '@emotion/styled';

export const Label = styled.span`
  color: var(--color-textgrey);
  font-size: 0.8rem;
  font-weight: bold;
  & span {
    margin-right: 5px;
  }
`;

export const Input = styled.input`
  border: none;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
  padding: 15px 0 15px 20px;
  border: 1px solid var(--color-border);
  box-sizing: border-box;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background-color: white;
  margin: 0 auto;
  margin-top: 3rem;
  width: 450px;
  height: 420px;
  max-width: 80%;
  padding: 40px 30px;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  @media all and (max-width: 400px) {
    padding: 0 20px 0 20px;
  }
`;

export const Button = styled.button`
  border: none;
  width: 100%;
  padding: 15px 0 15px 0;
  background-color: var(--color-primary);
  margin-top: 20px;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  cursor: pointer;
`;

export const ErrorMsg = styled.div`
  color: var(--color-error);
  font-size: 0.8rem;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 3.5rem;
  font-weight: 300;
  font-size: 1.8rem;
  color: var(--color-deep-gray);
`;
