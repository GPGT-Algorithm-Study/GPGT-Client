import Header from 'layouts/Header';
import React from 'react';
import { useSelector } from 'react-redux';
import { Content } from './style';
import MyInfoCard from './MyInfoCard';
import MyItemCard from './MyItemCard';
import RandomCard from './RandomCard';
import PointCard from './PointCard';
import { getUserInfo } from 'api/user';
import useFetch from 'hooks/useFetch';

/**
 * 마이페이지 화면
 */
function MyPage() {
  const user = useSelector((state) => state.user);
  const [userInfo, fetchUserInfo] = useFetch(
    getUserInfo,
    { bojHandle: user.bojHandle },
    { bojHandle: user.bojHandle },
  );

  return (
    <div>
      <Header />
      <Content>
        <MyInfoCard userInfo={userInfo} />
        <MyItemCard userInfo={userInfo} fetchUserInfo={fetchUserInfo} />
        <RandomCard userInfo={userInfo} />
        <PointCard userInfo={userInfo} />
      </Content>
    </div>
  );
}

export default MyPage;
