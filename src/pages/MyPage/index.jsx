import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Content } from './style';
import MyInfoCard from './MyInfoCard';
import MyItemCard from './MyItemCard';
import RandomCard from './RandomCard';
import PointLogCard from './PointLogCard';
import WarningLogCard from './WarningLogCard';
import { useParams } from 'react-router-dom';
import UserBoard from './UserBoard';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import RoadmapCard from './RoadmapCard';

/**
 * 마이페이지 화면
 */
function MyPage() {
  const { bojHandle } = useParams();
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const [isUser, setIsUser] = useState(false);
  const { data: userInfo } = useSWR(
    `${USER_PREFIX_URL}/info?bojHandle=${bojHandle}`,
    fetcher,
  );
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (!loginUser) return;
    setIsUser(loginUser.claim === bojHandle);
  }, [loginUser]);

  useEffect(() => {
    if (!userInfo || isEmpty(userInfo)) return;
    setIsBlocked(userInfo.warning == 4);
  }, [userInfo]);

  if (!userInfo) return null;

  return (
    <div>
      <Content>
        <MyInfoCard userInfo={userInfo} isUser={isUser} />
        {!isBlocked && <MyItemCard />}
        {!isBlocked && <RandomCard />}
        <PointLogCard totalPoint={userInfo.point} />
        <WarningLogCard totalWarning={userInfo.warning} />
        <RoadmapCard />
        <UserBoard />
      </Content>
    </div>
  );
}

export default MyPage;
