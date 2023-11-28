import React from 'react';
import YesterdayUnsolved from './YesterdayUnsolved';
import UserManageList from './UserManageList';
import { CommonFlexWrapper, CommonTitle } from 'style/commonStyle';
import ShowAllUserLogs from './ShowAllUserLogs';
import PointEvent from './PointEvent';
import LastLogin from './LastLogin';

function Admin() {
  return (
    <div>
      <CommonFlexWrapper>
        <CommonTitle>관리자 페이지</CommonTitle>
      </CommonFlexWrapper>
      <br></br>
      <YesterdayUnsolved />
      <LastLogin />
      <PointEvent />
      <ShowAllUserLogs />
      <UserManageList />
    </div>
  );
}

export default Admin;
