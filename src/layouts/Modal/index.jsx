import React, { useCallback } from 'react';
import { CreateModal, CloseModalButton } from './style';
import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({ children, style, show, onCloseModal }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateModal onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>
          <IoCloseOutline size="21" />
        </CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
