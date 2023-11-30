import Modal from 'layouts/Modal';
import React, { useCallback, useEffect, useState } from 'react';
import { Title, Form, InfoMsg } from './style';
import { createRoadmap, updateRoadmap } from 'api/roadmap';
import useInput from 'hooks/useInput';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { ROADMAP_PREFIX_URL } from 'utils/constants';
import { isEmpty } from 'lodash';

/**
 * 로드맵 생성 팝업
 */
function CreateRoadmapPopup({ show, onClose, roadmapInfo }) {
  const { mutate: mutateRoadmapList } = useSWR(
    `${ROADMAP_PREFIX_URL}/search/all`,
    fetcher,
  );

  const { mutate: mutateRoadmap } = useSWR(
    !isEmpty(roadmapInfo)
      ? `${ROADMAP_PREFIX_URL}/search/?roadmapId=${roadmapInfo.id}`
      : null,
    fetcher,
  );

  const [name, onChangeName, setName] = useInput('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const isEdit = !isEmpty(roadmapInfo);
    setEditMode(isEdit);
    if (isEdit) {
      setName(roadmapInfo.name);
    } else {
      setName('');
    }
  }, [roadmapInfo, show]);

  const addRoadmap = useCallback(async () => {
    try {
      await createRoadmap(name);
      toast.success('로드맵을 생성하였습니다.');
      mutateRoadmapList();
      onClose();
      setName('');
    } catch (e) {
      console.error(e);
    }
  }, [name]);

  const editRoadmap = useCallback(async () => {
    try {
      await updateRoadmap(roadmapInfo.id, name);
      toast.success('로드맵을 수정하였습니다.');
      mutateRoadmap();
      onClose();
      setName('');
    } catch (e) {
      console.error(e);
    }
  }, [name]);

  return (
    <Modal
      show={show}
      onCloseModal={() => {
        onClose();
      }}
    >
      <Title>
        <h2>로드맵 {editMode ? '수정' : '생성'}</h2>
      </Title>
      <InfoMsg>로드맵 이름</InfoMsg>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          if (editMode) editRoadmap();
          else addRoadmap();
        }}
      >
        <input
          placeholder="로드맵 이름을 입력해주세요."
          value={name}
          onChange={onChangeName}
        />
        <button>{editMode ? '수정하기' : '생성하기'}</button>
      </Form>
    </Modal>
  );
}

export default CreateRoadmapPopup;
