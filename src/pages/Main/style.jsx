import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const BannerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  margin: 0 0 25px 0;
  padding: 15px 25px 15px 25px;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: start;
  margin: 0 0 0 30px;
  & div {
    background-color: var(--color-tag);
    text-align: center;
    margin-right: 15px;
    padding: 15px 25px 15px 25px;
    border-radius: 50px;
    cursor: pointer;
    :hover {
      font-weight: bold;
      color: white;
      background-color: var(--color-primary);
    }
  }
  .selected {
    font-weight: bold;
    color: white;
    background-color: var(--color-primary);
  }
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
  margin-bottom: 25px;
`;

export const NoticeCard = styled(CommonCard)`
  padding: 12px;
  margin: 0 20px 50px 20px;
  cursor: pointer;
  /* color: white;
  background-color: var(--color-primary); */
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

export const ContentTitle = styled.div`
  margin: 0 0 20px 30px;
  align-items: center;
  font-weight: bold;
  font-size: 21px;
  display: flex;
  flex-wrap: wrap;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: normal;
  color: var(--color-textgrey);
  & b {
    font-weight: bold;
  }
  & div {
    margin-right: 5px;
  }
`;

export const UtilWrapper = styled.div`
  margin: 30px 20px 50px 20px;
  display: flex;
`;

export const Util = styled.div`
  display: flex;
  margin-right: 20px;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #3b3b3b;
`;

export const UtilIcon = styled.div`
  width: 75px;
  height: 75px;
  flex-shrink: 0;
  border-radius: 10px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  background: white;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50px 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #424242;
`;

export const BannerInfo = styled.div`
  font-size: 28px;
  & b {
    font-weight: bold;
  }
  word-break: keep-all;
  line-height: 1.5;
`;
