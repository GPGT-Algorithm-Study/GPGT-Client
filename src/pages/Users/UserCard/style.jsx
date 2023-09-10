import styled from '@emotion/styled';
import { CommonProfileImage } from 'style/commonStyle';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px 20px 0 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  & img {
    margin-right: 4px;
  }
  .id-wrapper {
    margin-left: 15px;
  }
  .user-id {
    font-weight: bold;
    font-size: 1.2rem;
  }
  .boj-handle {
    display: flex;
    margin-top: 5px;
    align-items: center;
    flex-wrap: wrap;
    color: var(--color-textlight);
    .point-icon {
      margin-left: 15px;
      font-weight: bold;
      color: var(--color-point);
    }
    .points {
      color: black;
      font-weight: bold;
      margin: 0 0 0 4px;
    }
  }
`;

export const Point = styled.div`
  font-size: 1rem;
  .point-icon {
    font-weight: bold;
    color: var(--color-point);
  }
  .points {
    color: black;
    font-weight: bold;
    margin: 0 0 0 4px;
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

export const SolvedInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const Warning = styled.div`
  background-color: ${(props) =>
    props.warning ? 'var(--color-error)' : 'var(--color-unchecked)'};
  width: 16px;
  height: 16px;
  border-radius: 50px;
`;

export const StreakSolved = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 6px;
  font-size: 0.9rem;
  & span {
    font-weight: bold;
  }
`;

export const Line = styled.div`
  margin-top: 20px;
  height: 1px;
  background-color: var(--color-unchecked);
`;

export const RandomStreakInfo = styled.div`
  margin-top: 15px;
  & div {
    & span {
      font-weight: bold;
    }
  }
`;

export const MaxStreak = styled.div`
  color: var(--color-textgrey);
  font-weight: normal !important;
  font-size: 0.9rem;
  & span {
    color: black;
    font-weight: bold;
  }
`;

export const ToggleButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px -20px 0 -20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #b6b6b6;
  background-color: #f5f5f5;
  /* border-top: 1px solid var(--color-unchecked); */
  height: 25px;
  cursor: pointer;
  & span {
    margin-top: 5px;
  }
`;

export const ScrollButton = styled.button`
  border: none;
  position: absolute;
  background: transparent;
  text-align: center;
  cursor: pointer;
  z-index: 999;
  right: ${(props) => (props.type == 'next' ? '0' : '')};
  margin-right: ${(props) => (props.type == 'next' ? '-20px' : '')};
  margin-left: ${(props) => (props.type == 'prev' ? '-20px' : '')};
  height: 60px;
  & div {
    color: #b6b6b6;
  }
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

export const AcLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TierWrapper = styled.div`
  margin-left: 24px;
  width: 150px;
  display: flex;
  justify-content: start;
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;
