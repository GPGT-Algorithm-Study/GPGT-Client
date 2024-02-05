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
  font-weight: 600;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  border: none;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid var(--color-border);
  padding: 1rem;
  box-sizing: border-box;
`;

export const Button = styled.button`
  border: none;
  width: 100%;
  padding: 1rem;
  background-color: var(--color-primary);
  margin-top: 20px;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  cursor: pointer;
`;

export const ErrorMsg = styled.div`
  margin-top: 7px;
  color: var(--color-error);
  font-size: 0.9rem;
`;

export const InfoMsg = styled.div`
  margin-bottom: 20px;
  color: var(--color-text-gray);
  font-size: 0.8rem;
  text-align: left;
  line-height: 1.2;
`;
