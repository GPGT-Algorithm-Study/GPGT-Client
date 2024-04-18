import styled from '@emotion/styled';
import { CommonCard, CommonButton } from 'style/commonStyle';
export const Card = styled(CommonCard)`
  padding: 20px 0 0 0;
  width: 100%;

  @media all and (min-width: 1000px) {
    width: 50%;
  }
`;

export const Content = styled.div`
  //display: flex;
  padding: 20px 0;
`;

export const Title = styled.div`
  position: relative;
  top: 0;
  left: 0;
  font-weight: bold;
  margin-bottom: 25px;
  padding-left: 25px;
`;

export const ScrollButton = styled.button`
  border: none;
  position: absolute;
  background: transparent;
  text-align: center;
  cursor: pointer;
  z-index: 999;
  right: ${(props) => (props.type == 'next' ? '0' : '')};
  left: ${(props) => (props.type == 'prev' ? '0' : '')};
  height: 80px;
  & div {
    color: #b6b6b6;
  }
`;
export const TabWrapper = styled.span`
  display: relative;
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
  border-width: 2px;
  border-style: outset;
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

export const ButtonWrapper = styled.div`
  display: flex;
  margin-right: 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const TextWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  width: 100%;
  //justify-content: space-between;
  //@media all and (min-width: 700px) {}
`;

export const ComplaintWrapper = styled.div`
  height: 557px;
  overflow-y: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Complaint = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //grid-template-columns: 1fr 1fr 2fr 2fr 2fr 1fr;

  margin-bottom: 10px;
  width: 95%;
  height: auto;
  margin: 0 auto;
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
  align-items: center;
  @media all and (min-width: 700px) {
    //flex-direction: row;
  }
  @media all and (max-width: 700px) {
  }
`;

export const ComplaintContent = styled.div`
  //flex-grow: 1;
  max-height: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  //margin-right: 20px;
  //white-space: nowrap;
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
  color: orange;
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
