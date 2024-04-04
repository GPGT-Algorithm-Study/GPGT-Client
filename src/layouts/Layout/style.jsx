import styled from '@emotion/styled';
import { CommonProfileImage } from 'style/commonStyle';

const MOBILE_WIDTH = '790px';

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  .clickable {
    cursor: pointer;
  }
`;

export const Header = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

export const ProfileImage = styled(CommonProfileImage)`
  cursor: pointer;
  margin-left: 8px;
`;

export const Content = styled.div`
  width: 100%;
  /* height: 100vh; */
  /* overflow: scroll; */
  & section {
    padding: 2rem 2rem 10rem 2rem;
    margin-left: auto;
    margin-right: auto;
    max-width: var(--width-maxwidth);
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const MenuItem = styled.div`
  color: #000;
  font-weight: 400 !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 10px 20px;
  border-radius: 5px;
  :hover {
    background-color: var(--color-button-gray);
  }
`;

export const Menu = styled.div`
  display: flex;
  z-index: 999;
  .selected {
    color: var(--color-primary);
    font-weight: 600 !important;
    background-color: transparent !important;
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  background-color: transparent;
  z-index: 1001;
  margin-left: 20px;
  @media all and (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

export const MobileMenuItem = styled.div`
  font-weight: 500;
  color: var(--color-text-gray);
  cursor: pointer;
  display: flex;
  padding: 10px;
  font-size: ${(props) => props.fontSize};
  margin-bottom: 10px;
  & div {
    margin-left: 10px;
  }
`;

export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  height: 85%;
  margin-top: 30px;
  .selected {
    color: #000;
    background-color: var(--color-button-gray);
    border-radius: 5px;
    font-weight: normal;
  }
`;

export const SideMenu = styled.aside`
  height: 100vh;
  float: left;
  background-color: white;
  padding: 10px 12px 0 12px;
  @media all and (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

export const SideMyInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 7px;
  font-size: 18px;
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
  position: absolute;
  background-color: #fff;
  z-index: 999;
  top: 65px;
`;

export const EventHeader = styled.div`
  margin-bottom: 10px;
  background: linear-gradient(
    90deg,
    rgba(68, 170, 252, 0.4) 0%,
    rgba(94, 252, 245, 0.7) 14%,
    rgba(227, 252, 120, 0.7) 30%,
    rgba(253, 193, 144, 0.7) 46%,
    rgba(238, 180, 254, 0.7) 60%,
    rgba(203, 243, 254, 0.7) 74%,
    rgba(185, 255, 173, 0.7) 87%,
    rgba(235, 249, 116, 0.7) 100%
  );
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  overflow: hidden;
  & div {
    & b {
      font-weight: bold;
    }
    margin: 0;
    padding-left: 100%;
    display: inline-block;
    white-space: nowrap;
    -webkit-animation-name: marquee;
    -webkit-animation-timing-function: linear;
    -webkit-animation-duration: ${(props) => 20 * (props.length * 0.9)}s;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-name: marquee;
    -moz-animation-timing-function: linear;
    -moz-animation-duration: ${(props) => 20 * (props.length * 0.9)}s;
    -moz-animation-iteration-count: infinite;
    -ms-animation-name: marquee;
    -ms-animation-timing-function: linear;
    -ms-animation-duration: ${(props) => 20 * (props.length * 0.9)}s;
    -ms-animation-iteration-count: infinite;
    -o-animation-name: marquee;
    -o-animation-timing-function: linear;
    -o-animation-duration: ${(props) => 20 * (props.length * 0.9)}s;
    -o-animation-iteration-count: infinite;
    animation-name: marquee;
    animation-timing-function: linear;
    animation-duration: ${(props) => 20 * (props.length * 0.9)}s;
    animation-iteration-count: infinite;
  }
  @-webkit-keyframes marquee {
    from {
      -webkit-transform: translate(0%);
    }
    99%,
    to {
      -webkit-transform: translate(-100%);
    }
  }
  @-moz-keyframes marquee {
    from {
      -moz-transform: translate(0%);
    }
    99%,
    to {
      -moz-transform: translate(-100%);
    }
  }
  @-ms-keyframes marquee {
    from {
      -ms-transform: translate(0%);
    }
    99%,
    to {
      -ms-transform: translate(-100%);
    }
  }
  @-o-keyframes marquee {
    from {
      -o-transform: translate(0%);
    }
    99%,
    to {
      -o-transform: translate(-100%);
    }
  }
  @keyframes marquee {
    from {
      transform: translate(0%);
    }
    99%,
    to {
      transform: translate(-100%);
    }
  }
`;

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid var(--color-border);
  z-index: 1001;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
`;

export const CloseButton = styled.span`
  position: sticky;
  right: 10px;
  cursor: pointer;
`;

export const MobileHamburgerMenu = styled.div`
  margin: 20px 0 0 10px;
`;

export const HeaderLogoImg = styled.img`
  width: 75px;
  margin-top: 2px;
`;

export const LoginButton = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  background-color: var(--color-button-gray);
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

export const MobileLoginButton = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  background-color: var(--color-button-gray);
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

export const MyPageMenu = styled.div`
  position: fixed;
  top: 50px;
  right: 20px;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  align-items: start;
  color: var(--color-text-gray);
  gap: 1rem;
  padding: 1rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  font-weight: 400;
  background-color: #fff;
  width: 5.5rem;
  z-index: 2999;
  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const CreateModal = styled.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
`;
