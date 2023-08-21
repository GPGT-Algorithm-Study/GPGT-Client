import styled from '@emotion/styled';

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-bottom: 7px;
  background-color: white;
  border-radius: 10px;
  padding: 20px 0 20px 0;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
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

export const Content = styled.div`
  position: relative;
  display: flex;
`;

export const User = styled.div`
  width: 130px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font: 0.9rem;
  & div {
    margin-bottom: 20px;
  }
`;

export const Title = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  font-weight: bold;
  margin-bottom: 25px;
  padding-left: 25px;
`;

export const ScrollButton = styled.button`
  border: none;
  position: absolute;
  background: transparent;
  text-align: center;
  cursor: pointer;
  z-index: 999;
  right: ${(props) => (props.type == 'next' ? '0' : '')};
  left: ${(props) => (props.type == 'prev' ? '0' : '')};
  height: 80px;
  & div {
    color: #b6b6b6;
  }
`;
