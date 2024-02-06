import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 3rem 2rem;
  overflow: auto;
  box-sizing: border-box;
  border: none;
  background-color: #f7f7f7;
  position: relative;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: var(--color-text-gray);
`;

export const UserId = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  .user-id {
    font-weight: 600;
    font-size: 1.1rem;
  }
  .boj-handle {
    display: flex;
    font-size: 0.9rem;
    color: var(--color-text-gray);
  }
`;

export const WarningWrapper = styled.div`
  width: 50px;
  display: flex;
  justify-content: space-between;
`;

export const Warning = styled.div`
  background-color: ${(props) =>
    props.warning ? 'var(--color-error)' : 'var(--color-unchecked)'};
  width: 10px;
  height: 10px;
  border-radius: 50px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 0.85rem;
  margin-top: 1.5rem;
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 400;
    color: var(--color-text-gray);
    > span {
      font-weight: 600;
      color: var(--color-deep-gray);
    }
  }
`;

export const SettingMenu = styled.div`
  position: absolute;
  top: 2.3rem;
  right: 0.8rem;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  align-items: start;
  color: var(--color-text-gray);
  gap: 1rem;
  padding: 1rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  font-weight: 400;
  position: absolute;
  background-color: #fff;
  width: 7rem;
  > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .loading {
    animation: rotate_image 1.5s linear infinite;
    transform-origin: 50% 50%;
    @keyframes rotate_image {
      100% {
        transform: rotate(-360deg);
      }
    }
  }
`;

export const ToggleButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #b6b6b6;
  background-color: var(--color-button-gray);
  height: 25px;
  cursor: pointer;
  & span {
    margin-top: 5px;
  }
`;
