import Header from 'layouts/Header';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
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
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (isEmpty(userInfo)) return;
    setIsBlocked(userInfo.warning == 4);
  }, [userInfo]);

  return (
    <div>
      <Header />
      <Content>
        <MyInfoCard userInfo={userInfo} />
        {!isBlocked && (
          <MyItemCard userInfo={userInfo} fetchUserInfo={fetchUserInfo} />
        )}
        {!isBlocked && <RandomCard userInfo={userInfo} />}
        <PointCard userInfo={userInfo} />
      </Content>
    </div>
  );
}

export default MyPage;
