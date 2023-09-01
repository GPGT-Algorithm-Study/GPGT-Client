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

  const pointCardRef = useRef();
  /**
   * 마이페이지 모든 데이터를 다시 로드하는 함수
   */
  const reload = useCallback(() => {
    fetchUserInfo();
    console.log(pointCardRef);
  }, []);

  return (
    <div>
      <Header />
      <Content>
        <MyInfoCard userInfo={userInfo} />
        {!isBlocked && <MyItemCard userInfo={userInfo} reload={reload} />}
        {!isBlocked && <RandomCard userInfo={userInfo} />}
        <PointLogCard userInfo={userInfo} ref={pointCardRef} />
        <WarningLogCard userInfo={userInfo} />
      </Content>
    </div>
  );
}

export default MyPage;
