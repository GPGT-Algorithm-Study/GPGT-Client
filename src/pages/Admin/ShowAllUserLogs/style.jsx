import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px 0 20px 0;
  width: 100%;
  @media all and (min-width: 1000px) {
    width: 50%;
  }
`;

export const Title = styled.div`
  position: relative;
  top: 0;
  left: 0;
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

export const Value = styled.div`
  font-weight: bold;
  margin-right: 5px;

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
  overflow-y: scroll;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const Log = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
  width: 100%;
  text-decoration: ${(props) => (props.state ? '' : 'line-through')};
  text-decoration-color: var(--color-textgrey);
  /* flex-direction: column;
  @media (min-width: 700px) {
    flex-direction: row;
  } */
  @media all and (max-width: 700px) {
    border-top: 1px solid lightgray;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  flex-direction: column;
  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  justify-content: space-evenly;
  @media (max-width: 700px) {
    flex-direction: ${(props) => (props.msg ? 'row' : 'column')};
  }
`;

export const LogMsg = styled.div`
  flex-grow: 1;
  width: fit-content;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  //table-layout: fixed;
  margin-right: 20px;
`;

export const Date = styled.div`
  width: 70px;
  color: var(--color-textgrey);
  @media (max-width: 700px) {
    width: 100%;
  }
`;
export const Name = styled.div`
  width: 120px;
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

export const SubtitleWrapper = styled.div`
  display: flex;
  padding: 5px 20px;
  justify-content: space-between;
  align-items: center;
`;
