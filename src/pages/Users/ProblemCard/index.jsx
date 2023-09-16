import React from 'react';
import useFetch from 'hooks/useFetch';
import { getUserTodaySolvedProblems } from 'api/user';
import {
  Card,
  ProblemTitle,
  ProblemWrapper,
  LanguageTag,
  Tag,
  TagWrapper,
} from './style';
import { CommonTierImg } from 'style/commonStyle';

/**
 * 사용자가 해결한 문제 카드 컴포넌트
 */
function ProblemCard({ user }) {
  // 유저의 오늘 푼 문제들
  const [problems] = useFetch(getUserTodaySolvedProblems, [], {
    bojHandle: user.bojHandle,
  });

  return (
    <>
      {problems.length > 0 &&
        problems.map((problem) => (
          <Card key={problem.problemId}>
            <a
              href={`https://www.acmicpc.net/problem/${problem.problemId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ProblemTitle>
                <CommonTierImg
                  src={`https://static.solved.ac/tier_small/${problem.tier}.svg`}
                  width="20"
                  height="20"
                />
                <p>
                  {problem.problemId != 0 && `${problem.problemId}번 : `}
                  {problem.title}
                </p>
              </ProblemTitle>
              {problem.problemId != 0 && (
                <ProblemWrapper>
                  <TagWrapper>
                    {problem.tags &&
                      problem.tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
                  </TagWrapper>
                  <TagWrapper>
                    <LanguageTag>{problem.language}</LanguageTag>
                  </TagWrapper>
                </ProblemWrapper>
              )}
            </a>
          </Card>
        ))}
    </>
  );
}

export default ProblemCard;
