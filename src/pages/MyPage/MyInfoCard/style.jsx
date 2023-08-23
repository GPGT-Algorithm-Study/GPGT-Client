import styled from '@emotion/styled';
import { CommonCard } from 'commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
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
