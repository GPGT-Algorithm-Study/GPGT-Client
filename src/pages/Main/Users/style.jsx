import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;
`;

export const UsersWrapper = styled.div`
  display: flex;
`;

export const ScrollButton = styled.div`
  position: fixed;
  left: ${(props) => (props.type == 'prev' ? '0' : '')};
  right: ${(props) => (props.type == 'next' ? '-1px' : '')};
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: center;
  width: 80px;
  height: 100%;
  z-index: 999;
  & div {
    margin-top: 150px;
  }
`;
