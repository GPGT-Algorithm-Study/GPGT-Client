import styled from '@emotion/styled';

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;
  > input {
    width: 100%;
    border: 1px solid var(--color-unchecked);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 7px;
  }
  > button {
    border: none;
    padding: 13px 25px;
    background-color: var(--color-primary);
    border-radius: 7px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    align-self: flex-end;
  }
`;

export const InfoMsg = styled.div`
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
`;
