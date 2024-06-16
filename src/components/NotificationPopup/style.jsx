import styled from '@emotion/styled';

export const Container = styled.div`
  position: fixed;
  top: 50px;
  right: 70px;
  width: 30rem;
  max-width: 75%;
  max-height: 25rem;
  height: ${({ fixHeight }) => (fixHeight ? '25rem' : 'auto')};
  /* border-radius: 10px; */
  border: 1px solid var(--color-border);
  background-color: #fff;
  z-index: 2999;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  @media all and (max-width: 520px) {
    width: 95%;
    max-width: 100%;
    height: 100vh;
    right: 5px;
  }
`;

export const Notification = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  padding: 1.5rem 1rem;
  position: relative;
  cursor: pointer;
  ${(props) => props.isRead && 'background-color: var(--color-button-gray);'}
  :hover {
    background-color: var(--color-button-gray);
  }
  :last-of-type {
    border-bottom: none;
  }
`;

export const NotifyType = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
`;

export const Message = styled.div`
  font-weight: 400;
  font-size: 0.9rem;
`;

export const Time = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.7rem;
  font-weight: 400 !important;
  color: var(--color-text-gray);
`;

export const Read = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.7rem;
  font-weight: 400 !important;
  color: var(--color-text-gray);
`;

export const NoNotification = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 0.9rem;
  width: 100%;
  height: 100%;
`;
