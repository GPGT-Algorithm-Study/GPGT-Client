import styled from '@emotion/styled';

export const CreateModal = styled.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
  background-color: rgba(0, 0, 0, 0.8);
  > div {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18rem;
    background: white;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.5);
    box-shadow:
      0 0 0 1px var(--saf-0),
      0 4px 12px 0 rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    user-select: none;
    padding: 1.5rem 2rem;
    max-width: 70%;
    /* padding: 10px; */
    z-index: 1012;
    position: relative;
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  background: transparent;
  border: none;
  font-size: 27px;
  color: var(--color-text-gray);
  cursor: pointer;
`;
