import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px;
  overflow: auto;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  margin-bottom: -15px;
  @media all and (max-width: 542px) {
    margin-bottom: 15px;
    justify-content: start;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const UserId = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 0 10px;
  .user-id {
    font-weight: bold;
    font-size: 1.2rem;
  }
  .boj-handle {
    display: flex;
    margin-top: 5px;
    color: var(--color-textlight);
  }
`;

export const WarningWrapper = styled.div`
  margin-top: 10px;
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

export const Button = styled.div`
  color: var(--color-textgrey);
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  background-color: var(--color-background);
  padding: 7px 12px 7px 12px;
  border-radius: 50px;
`;

export const UpdateButton = styled.div`
  align-self: flex-end;
  color: var(--color-textgrey);
  background-color: var(--color-background);
  padding: 9px;
  border-radius: 50%;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;
  margin-top: -30px;
  .loading {
    animation: rotate_image 1.5s linear infinite;
    transform-origin: 50% 50%;
    @keyframes rotate_image {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
