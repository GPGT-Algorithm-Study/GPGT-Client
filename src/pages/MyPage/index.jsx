import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Content, ProfileContent, ProfileInfo, BasicInfo } from './style';
import MyInfoCard from './MyInfoCard';
import { useParams } from 'react-router-dom';
import UserBoard from './UserBoard';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import RoadmapCard from './RoadmapCard';
import RandomProblemCard from 'pages/Users/RandomProblemCard';
import PageTitle from 'components/PageTitle';
import StreakCard from './StreakCard';
import LogCard from './LogCard';

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
  const { data: userInfo, mutate: mutaUserInfo } = useSWR(
    `${USER_PREFIX_URL}/info?bojHandle=${bojHandle}`,
    fetcher,
  );
  useEffect(() => {
    if (!loginUser) return;
    setIsUser(loginUser.claim === bojHandle);
  }, [loginUser, bojHandle]);

  if (!userInfo) return null;

  return (
    <Content>
      <PageTitle title="프로필" />
      <ProfileContent>
        <BasicInfo>
          <MyInfoCard
            userInfo={userInfo}
            isUser={isUser}
            loadData={mutaUserInfo}
          />
        </BasicInfo>
        <ProfileInfo>
          <StreakCard userInfo={userInfo} />
          <UserBoard />
          <RoadmapCard />
          <LogCard userInfo={userInfo} />
        </ProfileInfo>
      </ProfileContent>
    </Content>
  );
}

export default MyPage;
