import React, { useState } from 'react';
import UserCard from '../UserCard';
import RandomProblemCard from '../RandomProblemCard';
import { UserInfoWrapper, UserProblemInfo } from './style';
import ProblemCard from '../ProblemCard';
import {
  getUserRandomStreakGrass,
  getUserTodaySolvedProblems,
  getUserTodayRandomProblem,
} from '../../../../api/user';
import useFetch from '../../../../hooks/useFetch';

/**
 * 사용자 정보 컴포넌트 (User탭에서 세로 한 줄로 주어지는 사용자와 사용자의 문제 정보)
 */
function UserInfo({ user }) {
  const [isShowProblems, setIsShowProblems] = useState(false);

  // 유저의 스트릭 정보
  const [randomStreak] = useFetch(
    getUserRandomStreakGrass,
    {
      bojHandle: user.bojHandle,
    },
    [],
  );
  // 유저의 오늘 푼 문제들
  const [solvedProblems] = useFetch(
    getUserTodaySolvedProblems,
    {
      bojHandle: user.bojHandle,
    },
    [],
  );
  // 유저의 랜덤 문제
  const [randomProblem] = useFetch(
    getUserTodayRandomProblem,
    {
      bojHandle: user.bojHandle,
    },
    {},
  );

  return (
    <UserInfoWrapper>
      <UserProblemInfo>
        <UserCard
          user={user}
          randomStreak={randomStreak}
          setIsShowProblems={setIsShowProblems}
          isShowProblems={isShowProblems}
        />
        {isShowProblems && <RandomProblemCard randomProblem={randomProblem} />}
        {solvedProblems.length > 0 &&
          isShowProblems &&
          solvedProblems.map((problem) => {
            return <ProblemCard problem={problem} key={problem.problemId} />;
          })}
      </UserProblemInfo>
    </UserInfoWrapper>
  );
}

export default UserInfo;
