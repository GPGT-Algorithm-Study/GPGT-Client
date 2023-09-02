import Header from 'layouts/Header';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Content } from './style';
import MyInfoCard from './MyInfoCard';
import MyItemCard from './MyItemCard';
import RandomCard from './RandomCard';
import PointLogCard from './PointLogCard';
import WarningLogCard from './WarningLogCard';
import { getUserInfo } from 'api/user';
import useFetch from 'hooks/useFetch';
import { useParams } from 'react-router-dom';

/**
 * 마이페이지 화면
 */
function MyPage() {
  const { bojHandle } = useParams();
  const user = useSelector((state) => state.user);
  const [isUser] = useState(bojHandle == user.bojHandle);
  const [userInfo, fetchUserInfo] = useFetch(
    getUserInfo,
    { bojHandle: bojHandle },
    { bojHandle: bojHandle },
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
        <MyInfoCard userInfo={userInfo} isUser={isUser} />
        {!isBlocked && (
          <MyItemCard
            userInfo={userInfo}
            fetchUserInfo={fetchUserInfo}
            isUser={isUser}
          />
        )}
        {!isBlocked && <RandomCard userInfo={userInfo} isUser={isUser} />}
        <PointLogCard userInfo={userInfo} isUser={isUser} />
        <WarningLogCard userInfo={userInfo} isUser={isUser} />
      </Content>
    </div>
  );
}

export default MyPage;
