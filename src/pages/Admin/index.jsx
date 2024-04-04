import React from 'react';
import YesterdayUnsolved from './YesterdayUnsolved';
import UserManageList from './UserManageList';
import { CommonFlexWrapper, CommonTitle } from 'style/commonStyle';
import ShowAllUserLogs from './ShowAllUserLogs';
import PointEvent from './PointEvent';
import LastLogin from './LastLogin';
import { CardWrapper, ComponentWrapper } from './style';
import { getAllComplaint } from 'api/complaint';
import ComplaintManagement from './ComplaintManagement';

function Admin() {
  const complaint = getAllComplaint()
    .then((res) => console.info(res))
    .catch((e) => console.info(e));
  return (
    <div>
      <CommonFlexWrapper>
        <CommonTitle>관리자 페이지</CommonTitle>
      </CommonFlexWrapper>
      <br></br>
      <YesterdayUnsolved />
      <LastLogin />
      <CardWrapper>
        <PointEvent />
        <ComplaintManagement />
      </CardWrapper>
      <CardWrapper>
        <ShowAllUserLogs />
        <UserManageList />
      </CardWrapper>
    </div>
  );
}

export default Admin;
