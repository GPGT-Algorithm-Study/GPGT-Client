import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Card = styled(CommonCard)`
  padding: 25px;
`;

export const Title = styled.div`
  font-weight: bold;
  margin-bottom: 25px;
`;

export const ModeButton = styled.button`
  cursor: pointer;
  margin-left: 3px;
  border: none;
  padding: 7px 13px 7px 13px;
  background-color: white;
  border-radius: 5px;
  color: var(--color-textgrey);
  ${(props) => {
    if (props.selected) {
      return 'background-color: var(--color-background); font-weight: bold; color: black;';
    }
  }}
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2rem;
`;
