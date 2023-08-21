import React, { useCallback } from 'react';
import { CreateModal, CloseModalButton } from './style';

const Modal = ({ children, style, show, onCloseModal }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateModal onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
