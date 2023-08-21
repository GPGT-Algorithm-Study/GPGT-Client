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
  margin-bottom: 25px;
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
  align-items: center;
  border-radius: 7px;
  margin: auto;
  margin-top: 150px;
  background-color: white;
  width: 500px;
  height: 400px;
  max-width: 50%;
  padding: 0 50px 0 50px;
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
`;
