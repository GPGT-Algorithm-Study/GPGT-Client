import styled from '@emotion/styled';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  & form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  margin-bottom: 15px;
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

export const InfoMsg = styled.div`
  margin-bottom: 20px;
  color: var(--color-textgrey);
  font-size: 0.8rem;
  text-align: left;
  line-height: 1.2;
`;
