import styled from '@emotion/styled';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { CommonProfileImage } from 'style/commonStyle';
import { CommonCard } from 'style/commonStyle';
import { CommonButton } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px 20px 0 20px;
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  @media all and (min-width: 1180px) {
    width: calc(33% - 1px);
  }

  @media all and (min-width: 784px) and (max-width: 1180px) {
    width: calc(50% - 3px);
  }

  @media all and (max-width: 784px) {
    width: calc(100% - 3px);
  }
`;

const MAX_WIDTH = '610px';

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  & div {
    display: flex;
    align-items: center;
    text-align: start;
    & span {
      margin-right: 8px;
      color: var(--color-textgrey);
      font-size: 0.9rem;
    }
  }
  @media all and (max-width: ${MAX_WIDTH}) {
    flex-direction: column;
    align-items: start;
  }
`;

export const ProfileImage = styled(CommonProfileImage)`
  filter: ${(props) =>
    props.isWarning
      ? 'invert(93%) sepia(0%) saturate(2715%) hue-rotate(48deg) brightness(84%) contrast(87%)'
      : ''};
`;

export const WarningMsg = styled.div`
  font-weight: bold;
  color: var(--color-error);
  margin-top: 8px;
`;

export const WarningWrapper = styled.div`
  width: 80px;
  display: flex;
  justify-content: space-between;
`;

export const Warning = styled.div`
  background-color: ${(props) =>
    props.warning ? 'var(--color-error)' : 'var(--color-unchecked)'};
  width: 16px;
  height: 16px;
  border-radius: 50px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  margin-top: -69px;
  right: 0;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 998;
  /* background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px; */
  padding-right: 10px;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const VerticalUserListWrapper = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
  height: 476.98px;
  overflow-y: scroll;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const FormWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Button = styled(CommonButton)`
  text-align: center;
  color: white;
  font-weight: hard;
`;

export const Content = styled.div`
  display: relative;
  padding: 20px;
`;
