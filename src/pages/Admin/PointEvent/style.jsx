import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px;
  /*height: ${(props) =>
    props.eventCnt > 10
      ? '800px'
      : `${160.4 + 63.4 * props.eventCnt + 25}px`};*/
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

export const Button = styled.button`
  width: 80px;
  padding: 8px 0 8px 0;
  border-radius: 7px;
  background-color: lightgray;
  border: none;
  cursor: pointer;
`;

export const FormWrapper = styled.div`
  display: relative;
`;

export const InputWrapper = styled.div`
  display: flex;
  padding: 5px;
`;

export const TextWrapper = styled.div`
  display: flex;
`;

export const EventWrapper = styled.div`
  height: 500px;
  overflow-y: auto;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

export const Event = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  width: 100%;
  height: auto;
`;

export const EventDescription = styled.div`
  flex-grow: 1;
  text-overflow: ellipsis;
  table-layout: fixed;
  margin-right: 20px;
  @media all and (max-width: 600px) {
    display: none;
  }
`;

export const DateWrapper = styled.div`
  width: 120px;
  color: var(--color-textgrey);
`;
export const Name = styled.div`
  width: 150px;
  font-weight: bold;
`;
export const Id = styled.div`
  width: 30px;
  color: green;
`;
export const Value = styled.div`
  width: 80px;
  font-weight: bold;

  color: green;
  text-align: right;
  & p {
    display: inline;
    margin-left: 7px;
  }
`;
