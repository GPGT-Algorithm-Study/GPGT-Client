import styled from '@emotion/styled';

export const StreakWrapper = styled.div`
  margin-top: 10px;
  position: relative;
  display: flex;
  & div {
    width: 100%;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    direction: rtl;
  }
  & div::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollButton = styled.button`
  border: none;
  position: absolute;
  background: transparent;
  text-align: center;
  cursor: pointer;
  z-index: 999;
  right: ${(props) => (props.type == 'next' ? '0' : '')};
  margin-right: ${(props) => (props.type == 'next' ? '-20px' : '')};
  margin-left: ${(props) => (props.type == 'prev' ? '-20px' : '')};
  height: 60px;
  & div {
    color: #b6b6b6;
  }
`;
