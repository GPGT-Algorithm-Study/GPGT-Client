import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px;
`;

export const Title = styled.div`
  font-weight: bold;
  margin-bottom: 30px;
`;

export const Value = styled.div`
  width: 80px;
  font-weight: bold;
  color: ${(props) =>
    props.plus ? 'var(--color-error)' : 'var(--color-textgrey)'};
  text-align: right;
  & p {
    display: inline;
    margin-left: 7px;
  }
`;

export const TotalWarning = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  font-weight: bold;
  font-size: 1.2rem;
  & p {
    display: inline;
    color: var(--color-point);
  }
`;

export const LogWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
`;

export const Log = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  width: 100%;
  text-decoration: ${(props) => (props.state ? '' : 'line-through')};
  text-decoration-color: var(--color-textgrey);
`;

export const TextWrapper = styled.div`
  display: flex;
`;

export const LogMsg = styled.div`
  margin-right: 20px;
  @media all and (max-width: 600px) {
    display: none;
  }
`;

export const Date = styled.div`
  width: 100px;
  color: var(--color-textgrey);
`;

export const Button = styled.button`
  width: 80px;
  padding: 12px 0 12px 0;
  border-radius: 7px;
  background-color: var(--color-background);
  border: none;
  cursor: pointer;
  align-self: center;
  margin: 15px 0 15px 0;
`;

export const Warning = styled.div`
  background-color: var(--color-error);
  width: 10px;
  height: 10px;
  border-radius: 50px;
  margin-right: 10px;
`;
