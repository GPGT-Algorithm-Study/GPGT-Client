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
  padding-bottom: 20px;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 15px 10px;
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
  margin-top: -35px;
`;
