import styled from '@emotion/styled';
import { CommonCard, CommonButton } from 'style/commonStyle';
export const Card = styled(CommonCard)`
  position: relative;
  flex-wrap: nowrap;
  padding: 20px 0 20px 0;
`;

export const UserWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MAX_WIDTH = '610px';

export const Content = styled.div`
  display: relative;
  padding: 20px;
`;

export const VerticalUserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 542.5px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const User = styled.div`
  width: 130px;
  display: flex;
  flex: 0 0 auto;
  padding: 10px 0 10px 0;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font: 0.9rem;
  & div {
    margin-bottom: 20px;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  & div {
    display: flex;
    align-items: center;
    text-align: start;
    & span {
      margin-right: 8px;
      color: var(--color-textgrey);
      font-size: 0.9rem;
    }
  }
  @media all and (max-width: ${MAX_WIDTH}) {
    flex-direction: column;
    align-items: start;
  }
`;

export const Button = styled(CommonButton)`
  text-align: center;
  padding: 10px 0;
  background-color: ${(props) => (props.isAdd ? 'green' : 'crimson')};
  color: white;
  width: ${(props) => (props.isAdd ? '40vw' : '20vw')};
  margin-right: 10px;
  ${(props) => {
    if (props.isAdd) {
      return 'margin-top: 20px; margin-left: 30px;';
    }
  }}
  max-width: ${(props) => (props.isAdd ? '150px' : '50px')};
  @media (max-width: 600px) {
    scale: 80%;
  }
`;

export const UserItem = styled.div`
  display: flex;
  padding: 10px 2px;
  width: 100%;
`;

export const UserDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-overflow: ellipsis;
  width: 100%;
  margin-left: 10px;
  justify-content: space-evenly;

  @media all and (min-width: ${MAX_WIDTH}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const UserDescriptionName = styled.div`
  font-weight: 700;
`;
