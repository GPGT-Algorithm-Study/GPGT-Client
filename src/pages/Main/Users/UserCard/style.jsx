import styled from '@emotion/styled';

export const Card = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  width: var(--width-usercard);
  margin-bottom: 7px;
  padding: 20px 20px 20px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
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
    color: var(--color-textlight);
    .point-icon {
      margin-left: 15px;
      font-weight: bold;
      color: var(--color-point);
    }
    .points {
      color: black;
      font-weight: bold;
      margin-left: 4px;
    }
  }
`;
export const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
export const SolvedInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  .warning-wrapper {
    width: 70px;
    display: flex;
    justify-content: space-between;
  }
  .tier-wrapper {
    margin-left: 10px;
    width: 200px;
    display: flex;
    justify-content: start;
  }
`;

export const Warning = styled.div`
  background-color: ${(props) =>
    props.warning ? 'var(--color-error)' : 'var(--color-unchecked)'};
  width: 15px;
  height: 15px;
  border-radius: 50px;
`;

export const TierImg = styled.img`
  line-height: inherit;
  width: ${(props) => props.width && props.width};
  height: ${(props) => props.height && props.height};
  vertical-align: middle;
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
    font-weight: bold;
  }
`;

export const Streak = styled.div`
  margin-top: 10px;
`;
