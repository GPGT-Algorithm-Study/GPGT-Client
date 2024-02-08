import React from 'react';
import { Content, Title } from './style';
import Modal from 'layouts/Modal';
import SettingRandom from './SettingRandom';

function SettingRandomPopup({ showModal, closeModal }) {
  return (
    <Modal show={showModal} onCloseModal={closeModal}>
      <Content>
        <Title>랜덤 문제 추천 설정하기</Title>
        <SettingRandom closeModal={closeModal} />
      </Content>
    </Modal>
  );
}

export default SettingRandomPopup;
