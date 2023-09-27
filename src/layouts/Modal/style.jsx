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
  & > div {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    background: white;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.5);
    box-shadow:
      0 0 0 1px var(--saf-0),
      0 4px 12px 0 rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    user-select: none;
    max-width: 620px;
    padding: 30px 40px 30px;
    z-index: 1012;
    position: relative;
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 6px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
`;
