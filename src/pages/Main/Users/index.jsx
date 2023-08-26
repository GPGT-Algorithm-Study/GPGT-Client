import React, { useRef, useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';
import { CardWrapper, UserInfoWrapper, UserProblemInfo } from './style';
import { getAllUsers } from 'api/user';
import UserCard from './UserCard';
import RandomProblemCard from './RandomProblemCard';
import ProblemCard from './ProblemCard';

/**
 * 사용자 탭 내용 컴포넌트
 */
function Users() {
  // 모든 사용자 정보 조회
  const [users] = useFetch(getAllUsers, []);
  const [sortedUsers, setSortedUsers] = useState([]);
  // 하단 문제 정보 펼칠지 여부
  const [showProblemsId, setShowProblemsId] = useState({});

  const toggleShowProblemsId = (key) => {
    setShowProblemsId((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    setSortedUsers(
      [...users].sort(
        (a, b) =>
          parseInt(b.todaySolvedProblemCount) -
          parseInt(a.todaySolvedProblemCount),
      ),
    );
  }, [users]);

  return (
    <div>
      <UserInfoWrapper>
        {sortedUsers &&
          sortedUsers.map((user) => (
            <CardWrapper key={user.notionId}>
              <UserProblemInfo>
                <UserCard
                  user={user}
                  toggleShowProblemsId={toggleShowProblemsId}
                  showProblemsId={showProblemsId}
                />
                {showProblemsId[user.notionId] && (
                  <>
                    <RandomProblemCard user={user} />
                    <ProblemCard user={user} />
                  </>
                )}
              </UserProblemInfo>
            </CardWrapper>
          ))}
      </UserInfoWrapper>
    </div>
  );
}

export default Users;
