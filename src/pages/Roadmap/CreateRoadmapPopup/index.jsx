import Modal from 'layouts/Modal';
import React, { useCallback } from 'react';
import { Title, Form, InfoMsg } from './style';
import { createRoadmap } from 'api/roadmap';
import useInput from 'hooks/useInput';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { ROADMAP_PREFIX_URL } from 'utils/constants';

/**
 * 로드맵 생성 팝업
 */
function CreateRoadmapPopup({ show, onClose }) {
  const { mutate: mutateRoadmap } = useSWR(
    `${ROADMAP_PREFIX_URL}/search/all`,
    fetcher,
  );

  const [name, onChangeName, setName] = useInput('');

  const addRoadmap = useCallback(async () => {
    try {
      await createRoadmap(name);
      toast.success('로드맵을 생성하였습니다.');
      mutateRoadmap();
      onClose();
      setName('');
    } catch (e) {
      console.error(e);
    }
  }, [name]);

  return (
    <Modal show={show} onCloseModal={onClose}>
      <Title>
        <h2>로드맵 생성</h2>
      </Title>
      <InfoMsg>로드맵 이름</InfoMsg>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addRoadmap();
        }}
      >
        <input
          placeholder="로드맵 이름을 입력해주세요."
          value={name}
          onChange={onChangeName}
        />
        <button>생성하기</button>
      </Form>
    </Modal>
  );
}

export default CreateRoadmapPopup;
