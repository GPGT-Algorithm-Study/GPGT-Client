import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { BackButtonWrapper } from './style';

function BackButton({ text, onClick }) {
  return (
    <BackButtonWrapper onClick={onClick}>
      <IoChevronBack />
      {text}
    </BackButtonWrapper>
  );
}

export default BackButton;
