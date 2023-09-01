import styled from '@emotion/styled';
import { CommonProfileImage } from 'style/commonStyle';

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  & div {
    font-weight: bold;
    margin: 5px 15px 5px 15px;
  }
  .clickable {
    cursor: pointer;
  }
`;

export const RightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  & div {
    font-weight: bold;
    margin: 10px 20px 10px 0px;
  }
  .clickable {
    cursor: pointer;
  }
`;

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255);
  z-index: 1000;
`;

export const Board = styled.div`
  display: flex;
  justify-content: center;
  height: 20rem;
`;

export const ProfileImage = styled(CommonProfileImage)`
  cursor: pointer;
`;
