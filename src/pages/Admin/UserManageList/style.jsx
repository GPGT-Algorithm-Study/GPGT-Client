import styled from '@emotion/styled';
import { CommonCard, CommonButton } from 'style/commonStyle';
export const Card = styled(CommonCard)`
  position: relative;
  flex-wrap: nowrap;
  padding: 20px 0 20px 0;
`;

export const UserWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
`;

export const VerticalUserListWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const User = styled.div`
  width: 130px;
  display: flex;
  flex: 0 0 auto;
  padding: 10px 0 10px 0;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font: 0.9rem;
  & div {
    margin-bottom: 20px;
  }
`;

export const Title = styled.div`
  position: sticky;
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

export const Button = styled(CommonButton)`
  text-align: center;
  height: 10px;
  width: 40px;
  background-color: ${(props) => (props.isAdd ? 'green' : 'crimson')};
  color: white;
  font-size: 1px;
  font-weight: hard;
  margin-right: 20px;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;
