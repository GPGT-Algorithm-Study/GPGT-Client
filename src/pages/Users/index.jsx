import React, { useCallback, useEffect, useState } from 'react';
import {
  CardWrapper,
  UserInfoWrapper,
  UserProblemInfo,
  Container,
} from './style';
import UserCard from './UserCard';
import RandomProblemCard from './RandomProblemCard';
import ProblemCard from './ProblemCard';
import { isEmpty } from 'lodash';
import useSWR from 'swr';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import PageTitle from 'components/PageTitle';
import SkeletonUserCard from './SkeletonUserCard';

/**
 * 사용자 탭 내용 컴포넌트
 */
function Users() {
  // 모든 사용자 정보 조회
  const { data: users, isLoading } = useSWR(
    `${USER_PREFIX_URL}/info/all`,
    fetcher,
  );
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const [sortedUsers, setSortedUsers] = useState([]);
  // 하단 문제 정보 펼칠지 여부
  const [showProblemsId, setShowProblemsId] = useState({});

  const toggleShowProblemsId = (key) => {
    setShowProblemsId((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // user 정보 가공
  useEffect(() => {
    if (!users || !loginUser) return;
    let tmpUsers = [...users].sort(
      (a, b) =>
        parseInt(b.todaySolvedProblemCount) -
        parseInt(a.todaySolvedProblemCount),
    );
    // 배열 맨 앞에 로그인한 사용자가 오고 block된 사용자는 맨뒤로 가도록 수정
    const loginUserIdx = tmpUsers.findIndex(
      (user) => user.bojHandle == loginUser.claim,
    );
    const tmpLoginUser = { ...tmpUsers[loginUserIdx] };
    tmpUsers.splice(loginUserIdx, 1);

    const blockedUsers = tmpUsers.filter((user) => user.warning == 4);
    const otherUsers = tmpUsers.filter((user) =>
      blockedUsers.every((b) => b.bojHandle != user.bojHandle),
    );

    tmpUsers = [tmpLoginUser, ...otherUsers, ...blockedUsers];
    setSortedUsers(tmpUsers);
  }, [users]);

  // 포인트를 변경한다. (문제 새로고침 시 사용)
  // 일단 화면단에서만 변경해줌 sortedUsers의 0번째 유저는 항상 로그인한 사용자
  const changePoint = useCallback(
    (point) => {
      sortedUsers[0].point += point;
      setSortedUsers([...sortedUsers]);
    },
    [sortedUsers],
  );

  if (isLoading) {
    return (
      <Container>
        <PageTitle showLeftTime={true} title="스터디원" />
        <UserInfoWrapper>
          {new Array(3).fill(0).map((_, i) => (
            <CardWrapper key={i}>
              <UserProblemInfo>
                <SkeletonUserCard />
              </UserProblemInfo>
            </CardWrapper>
          ))}
        </UserInfoWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle showLeftTime={true} title="스터디원" />
      <UserInfoWrapper>
        {sortedUsers &&
          sortedUsers.map((user, i) => {
            if (!isEmpty(user)) {
              return (
                <CardWrapper key={user.notionId}>
                  <UserProblemInfo>
                    <UserCard
                      user={user}
                      toggleShowProblemsId={toggleShowProblemsId}
                      showProblemsId={showProblemsId}
                    />
                    {showProblemsId[user.notionId] && (
                      <>
                        <RandomProblemCard
                          user={user}
                          changePoint={changePoint}
                        />
                        <ProblemCard user={user} />
                      </>
                    )}
                  </UserProblemInfo>
                </CardWrapper>
              );
            }
          })}
      </UserInfoWrapper>
    </Container>
  );
}

export default Users;
