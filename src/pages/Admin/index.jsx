import React from 'react';
import { UtilWrapper, Util, UtilIcon } from 'pages/Main/style';
import { useState } from 'react';
import { getYesterdayUnsolvedUsers } from 'api/statistics';
import useFetch from 'hooks/useFetch';
import YesterdayUnsolved from './YesterdayUnsolved';
import UserManageList from './UserManageList';
import WarningManage from './WarningManage';
import Modal from 'layouts/Modal';

function Admin() {
  const [showWarningManageModal, setShowWarningManageModal] = useState(false);
  const [showPointManageModal, setShowPointManageModal] = useState(false);
  const utils = [
    {
      id: 1,
      name: '경고 관리',
      iconUrl: `${process.env.PUBLIC_URL}/recommend_icon.svg`,
      clickListener: () => {
        setShowWarningManageModal(true);
      },
    },
    {
      id: 2,
      name: '포인트 관리',
      iconUrl: `${process.env.PUBLIC_URL}/recommend_icon.svg`,
      clickListener: () => {
        setShowPointManageModal(true);
      },
    },
  ];
  const onCloseModal = () => {
    setShowWarningManageModal(false);
    setShowPointManageModal(false);
  };
  const [yesterdayUnsolvedUsers] = useFetch(getYesterdayUnsolvedUsers, []);

  return (
    <div>
      <UtilWrapper>
        {utils.map((util) => (
          <Util key={util.id} onClick={util.clickListener}>
            <UtilIcon url={util.iconUrl}></UtilIcon>
            <div>{util.name}</div>
          </Util>
        ))}
      </UtilWrapper>
      <YesterdayUnsolved />
      <UserManageList />
      <Modal show={showWarningManageModal} onCloseModal={onCloseModal}>
        <WarningManage />
      </Modal>
      <Modal show={showPointManageModal} onCloseModal={onCloseModal}>
        PointManageModal
      </Modal>
    </div>
  );
}

export default Admin;
