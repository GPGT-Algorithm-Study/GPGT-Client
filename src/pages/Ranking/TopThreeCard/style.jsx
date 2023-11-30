import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  @media all and (max-width: 1440px) and (min-width: 784px) {
    width: calc(33% - 10px);
  }
  @media all and (max-width: 784px) {
    width: calc(100% - 3px);
  }
  position: relative;
  display: flex;
  padding: 30px 27px;
  gap: 10px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 230px;
  > span {
    color: #676767;
    font-weight: 500;
  }
`;

export const NameInfo = styled.div`
  font-size: 19px;
  font-weight: 600;
  margin-top: 20px;
`;

export const Medal = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  background-color: ${(props) => props.color};
`;
