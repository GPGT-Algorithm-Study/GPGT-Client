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
  /* margin-left: auto;
  margin-right: auto;
  max-width: var(--width-maxwidth); */
  width: 100%;
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
    margin: 0;
    padding-left: 100%;
    display: inline-block;
    white-space: nowrap;
    -webkit-animation-name: marquee;
    -webkit-animation-timing-function: linear;
    -webkit-animation-duration: 20s;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-name: marquee;
    -moz-animation-timing-function: linear;
    -moz-animation-duration: 20s;
    -moz-animation-iteration-count: infinite;
    -ms-animation-name: marquee;
    -ms-animation-timing-function: linear;
    -ms-animation-duration: 20s;
    -ms-animation-iteration-count: infinite;
    -o-animation-name: marquee;
    -o-animation-timing-function: linear;
    -o-animation-duration: 20s;
    -o-animation-iteration-count: infinite;
    animation-name: marquee;
    animation-timing-function: linear;
    animation-duration: 20s;
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
  padding: 10px 20px;
  background-color: rgb(245, 245, 247);
  z-index: 999;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
`;
