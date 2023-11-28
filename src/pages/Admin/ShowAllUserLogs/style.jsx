import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px;
`;

export const Title = styled.div`
  font-weight: bold;
  margin-bottom: 30px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-right: 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const ModeButton = styled.button`
  cursor: pointer;
  margin-left: 3px;
  border: none;
  padding: 7px 13px 7px 13px;
  background-color: white;
  border-radius: 5px;
  color: var(--color-textgrey);
  ${(props) => {
    if (props.selected) {
      return 'background-color: var(--color-background); font-weight: bold; color: black;';
    }
  }}
`;

export const Value = styled.div`
  width: 80px;
  font-weight: bold;

  color: ${(props) =>
    props.plus
      ? props.mode === 1
        ? 'var(--color-error)'
        : 'var(--color-point)'
      : 'var(--color-textgrey)'};
  text-align: right;
  & p {
    display: inline;
    margin-left: 7px;
  }
`;
export const LogWrapper = styled.div`
  height: 440px;
  overflow-y: auto;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
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
  //flex-direction: column;
`;

export const LogMsg = styled.div`
  flex-grow: 1;
  text-overflow: ellipsis;
  table-layout: fixed;
  margin-right: 20px;
  @media all and (max-width: 600px) {
    display: none;
  }
`;

export const Date = styled.div`
  width: 150px;
  color: var(--color-textgrey);
`;
export const Name = styled.div`
  width: 130px;
  font-weight: bold;
`;
export const Id = styled.div`
  width: 50px;
  color: ${(props) =>
    props.mode === 1 ? 'var(--color-error)' : 'var(--color-point)'};
`;

export const Button = styled.button`
  width: 80px;
  padding: 8px 0 8px 0;
  border-radius: 7px;
  background-color: lightgray;
  border: none;
  cursor: pointer;
`;
