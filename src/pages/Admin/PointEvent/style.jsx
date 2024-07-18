import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px 0 0 0;
  width: 100%;

  @media all and (min-width: 1000px) {
    width: 50%;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  margin-bottom: 25px;
  padding-left: 25px;
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
  margin-top: 5px;
  width: 100%;
  //justify-content: space-between;
  //@media all and (min-width: 700px) {}
`;

export const EventWrapper = styled.div`
  height: 500px;
  overflow-y: auto;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Event = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //grid-template-columns: 1fr 1fr 2fr 2fr 2fr 1fr;

  margin-bottom: 10px;
  width: 100%;
  height: auto;
  border-bottom: 1px solid lightgray;
  align-items: center;
  @media all and (min-width: 700px) {
    //flex-direction: row;
  }
  @media all and (max-width: 700px) {
  }
`;

export const EventDescription = styled.div`
  //flex-grow: 1;
  text-overflow: ellipsis;
  width: fit-content;
  margin-right: 20px;
  padding-bottom: 5px;
  @media all and (max-width: 700px) {
    width: 90%;
  }
`;

export const DateWrapper = styled.div`
  order: 3;
  width: 120px;
  color: var(--color-textgrey);
  @media all and (max-width: 400px) {
    font-size: 0.8rem;
  }
`;
export const Name = styled.div`
  order: 2;
  width: 150px;
  font-weight: bold;
`;
export const Id = styled.div`
  order: 1;
  width: 30px;
  color: green;
`;
export const Value = styled.div`
  font-weight: bold;
  margin-left: auto;
  margin-right: 5px;

  color: green;
  text-align: right;
  & p {
    display: inline;
    margin-left: 7px;
  }

  @media all and (max-width: 700px) {
    margin-left: unset;
  }
`;
