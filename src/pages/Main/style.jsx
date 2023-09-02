import styled from '@emotion/styled';

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
  background-color: white;
  /* background-image: linear-gradient(
    90deg,
    rgba(222, 238, 247, 1) 0%,
    rgba(235, 231, 245, 1) 20%,
    rgba(249, 243, 230, 1) 38%,
    rgba(249, 235, 239, 1) 56%,
    rgba(249, 243, 230, 1) 74%,
    rgba(222, 238, 247, 1) 93%
  ); */
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: start;
  margin: -43px 0 0 30px;
  & div {
    color: var(--color-textgrey);
    text-align: center;
    padding: 10px 15px 15px 15px;
    width: 50px;
    cursor: pointer;
    :hover {
      font-weight: bold;
      color: black;
    }
  }
  .selected {
    font-weight: bold;
    color: black;
    border-bottom: 3px solid black;
  }
`;

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  margin: 80px 0 45px 0;
`;

export const ContentWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: var(--width-maxwidth);
`;

export const Content = styled.div`
  margin: 30px 20px 20px 20px;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px 80px 50px;
`;
export const MessageContent = styled.div`
  margin: 20px 0 20px 0;
  line-height: 1.5;
  word-break: break-all;
  /* font-weight: bold; */
`;
export const Writer = styled.div`
  font-size: 0.9rem;
  color: var(--color-textgrey);
`;

export const NoticeCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 7px;
  padding: 12px;
  margin: 0 10px 15px 10px;
`;

export const Title = styled.div`
  font-weight: bold;
`;

export const CardWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: var(--width-maxwidth);
  width: 100%;
`;
