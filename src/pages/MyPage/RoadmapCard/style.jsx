import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 20px;
`;

export const Title = styled.div`
  font-weight: bold;
  margin-bottom: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 430px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }
`;
