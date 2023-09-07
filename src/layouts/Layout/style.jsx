import styled from '@emotion/styled';
import { CommonProfileImage } from 'style/commonStyle';

const MOBILE_WIDTH = '540px';

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 0 10px 0;
  & div {
    font-weight: bold;
    margin: 3px 15px 3px 5px;
  }
  .clickable {
    cursor: pointer;
  }
`;

export const RightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  & div {
    font-weight: bold;
    margin: 3px 20px 3px 0px;
  }
  .clickable {
    cursor: pointer;
  }
`;

export const Header = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0 20px 0;
`;

export const ProfileImage = styled(CommonProfileImage)`
  cursor: pointer;
  margin-left: 8px;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: var(--width-maxwidth);
  height: 100vh;
  overflow: scroll;
  & section {
    padding: 0 10px 100px 10px;
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const MenuItem = styled.div`
  font-weight: bold;
  color: var(--color-textgrey);
  cursor: pointer;
  display: flex;
  padding: 10px;
  font-size: ${(props) => props.fontSize};
  margin-bottom: 8px;
  & div {
    margin-left: 10px;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  height: 85%;
  .selected {
    color: white;
    background-color: var(--color-primary);
    border-radius: 8px;
    font-weight: normal;
  }
`;

export const FoldSide = styled.aside`
  height: 100vh;
  float: left;
  background-color: white;
  padding: 10px 12px 0 12px;
  @media all and (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

export const FoldMyInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 30px 0;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
`;

export const MobileMenuIcon = styled.span`
  margin: 0 10px 0 -10%;
  @media all and (min-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

export const HamburgerWrapper = styled.div`
  display: flex;
`;

export const MobileMenuWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 30px 0 30px;
  box-sizing: border-box;
`;
