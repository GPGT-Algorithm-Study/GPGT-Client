import styled from '@emotion/styled';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px 20px 40px;
  margin-bottom: 7px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  height: 100%;
`;

export const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
`;

export const RankWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 10px 0;
`;
export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  .notion-id {
    margin-right: 10px;
    font-weight: bold;
    font-size: 1.1rem;
  }
  .boj-handle {
    color: var(--color-textlight);
  }
`;

export const ScoreWrappeer = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;
