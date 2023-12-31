import React from 'react';
import { UtilWrapper, Util, UtilIcon } from 'pages/Main/style';
import { useState } from 'react';
import { getYesterdayUnsolvedUsers } from 'api/statistics';
import useFetch from 'hooks/useFetch';
import YesterdayUnsolved from './YesterdayUnsolved';
import UserManageList from './UserManageList';
import WarningManage from './WarningManage';
import PointManage from './PointManage';
import Modal from 'layouts/Modal';
import { CommonFlexWrapper, CommonTitle } from 'style/commonStyle';
import ShowAllUserLogs from './ShowAllUserLogs';
import PointEvent from './PointEvent';

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
      <CommonFlexWrapper>
        <CommonTitle>관리자 페이지</CommonTitle>
      </CommonFlexWrapper>
      <br></br>
      {/* <UtilWrapper>
        {utils.map((util) => (
          <Util key={util.id} onClick={util.clickListener}>
            <UtilIcon url={util.iconUrl}></UtilIcon>
            <div>{util.name}</div>
          </Util>
        ))}
      </UtilWrapper> */}
      <YesterdayUnsolved />
      <PointEvent />
      <ShowAllUserLogs />
      <UserManageList />
      {/* <Modal show={showWarningManageModal} onCloseModal={onCloseModal}>
        <WarningManage />
      </Modal>
      <Modal show={showPointManageModal} onCloseModal={onCloseModal}>
        <PointManage />
      </Modal> */}
    </div>
  );
}

export default Admin;
