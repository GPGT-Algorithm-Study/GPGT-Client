import styled from '@emotion/styled';
import { CommonProfileImage } from 'style/commonStyle';

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid var(--color-background);
  & div {
    font-weight: bold;
    margin: 3px 15px 3px 15px;
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
    margin: 3px 20px 3px 0px;
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

export const ProfileImage = styled(CommonProfileImage)`
  cursor: pointer;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: var(--width-maxwidth);
`;
