import styled from '@emotion/styled';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px 0 40px;
  margin-bottom: 7px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
  flex-wrap: wrap;
`;

export const UserInfoWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
`;

export const UserTag = styled.span`
  border-radius: 50px;
  font-weight: normal;
  padding: 3px 10px 3px 10px;
  font-size: 0.9rem;
  border: none;
  background-color: ${(props) =>
    props.team == 0 ? 'var(--color-teamsun)' : 'var(--color-teammoon)'};
  margin: 5px 7px 5px 0px;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 0 10px;
  & p {
    font-size: 1.4rem;
    font-weight: bold;
    margin-top: 30px;
  }
`;

export const ContributorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 0 10px;
  & p {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

export const ProfileImage = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const IconWrapper = styled.div`
  margin-top: -42px;
`;
