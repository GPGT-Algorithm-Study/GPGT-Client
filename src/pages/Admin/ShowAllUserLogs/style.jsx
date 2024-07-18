import styled from '@emotion/styled';
import { CommonCard, CommonButton } from 'style/commonStyle';

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
  padding: 7px;
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
  flex-direction: column;
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
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : 'no-wrap')};
  width: 100%;
  margin-top: 5px;
  @media (max-width: 700px) {
    /* flex-direction: ${(props) => (props.msg ? 'row' : 'column')}; */
  }
`;

export const LogMsg = styled.div`
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  //table-layout: fixed;
  margin-right: 5px;
`;

export const Date = styled.div`
  color: var(--color-textgrey);
  margin: 0 2px;
`;
export const Name = styled.div`
  font-weight: bold;
  margin: 0 2px;
`;
export const Id = styled.div`
  margin-right: 2px;
  color: ${(props) =>
    props.mode === 1 ? 'var(--color-error)' : 'var(--color-point)'};
`;

export const Button = styled(CommonButton)`
  background-color: lightgray;
  cursor: pointer;
  border-radius: 10px;
  @media (max-width: 700px) {
    padding: 7px;
    font-size: 0.8rem;
  }
`;

export const SubtitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  align-items: center;
  font-size: 0.9rem;
`;
