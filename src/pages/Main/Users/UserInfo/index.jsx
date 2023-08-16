import React, { useState, useEffect } from 'react';
import UserCard from '../UserCard';
import RandomProblemCard from '../RandomProblemCard';
import { UserInfoWrapper, UserProblemInfo } from './style';
import ProblemCard from '../ProblemCard';
import {
  getUserRandomStreakGrass,
  getUserTodaySolvedProblems,
  getUserTodayRandomProblem,
} from '../../../../api/user';

/**
 * 사용자 정보 컴포넌트 (User탭에서 세로 한 줄로 주어지는 사용자 정보)
 */
function UserInfo({ user }) {
  const [randomStreak, setRandomStreak] = useState([]);
  const [randomProblem, setRandomProblem] = useState({});
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    // 유저의 스트릭 정보를 조회한다.
    getUserRandomStreakGrass(user.bojHandle)
      .then((res) => {
        if (res.status == 200 && res.data) {
          const { data } = res;
          setRandomStreak(data);
        }
        // 데이터 제대로 못 받았을 경우 에러처리
      })
      .catch((e) => {
        throw new Error(e);
      });

    // 유저의 랜덤 문제 정보를 조회한다.
    getUserTodayRandomProblem(user.bojHandle)
      .then((res) => {
        if (res.status == 200 && res.data) {
          const { data } = res;
          let { todayRandomProblem } = data;
          todayRandomProblem.isTodayRandomSolved = data.isTodayRandomSolved;
          if (todayRandomProblem.problemId == 0) {
            todayRandomProblem = {
              ...todayRandomProblem,
              titleKo: '랜덤 문제 제목',
              point: 10,
              tags: ['그래프 이론', '그래프 탐색'],
              level: 9,
            };
          }
          setRandomProblem(todayRandomProblem);
        }
        // 데이터 제대로 못 받았을 경우 에러처리
      })
      .catch((e) => {
        throw new Error(e);
      });

    // 유저의 오늘 푼 문제들을 조회한다.
    getUserTodaySolvedProblems(user.bojHandle)
      .then((res) => {
        if (res.status == 200 && res.data) {
          const { data } = res;
          setSolvedProblems(data);
        }
        // 데이터 제대로 못 받았을 경우 에러처리
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, [user]);

  return (
    <UserInfoWrapper>
      <UserProblemInfo>
        <a href={`https://solved.ac/profile/${user.bojHandle}`}>
          <UserCard user={user} randomStreak={randomStreak} />
        </a>
        {randomProblem.problemId != 0 && (
          <a
            href={`https://www.acmicpc.net/problem/${randomProblem.problemId}`}
          >
            <RandomProblemCard problem={randomProblem} />
          </a>
        )}
        {randomProblem.problemId == 0 && (
          <RandomProblemCard problem={randomProblem} />
        )}
        {solvedProblems.length > 0 &&
          solvedProblems.map((problem) => {
            return (
              <a
                href={`https://www.acmicpc.net/problem/${problem.problemId}`}
                key={problem.problemId}
              >
                <ProblemCard problem={problem} key={problem.problemId} />
              </a>
            );
          })}
      </UserProblemInfo>
    </UserInfoWrapper>
  );
}

export default UserInfo;
