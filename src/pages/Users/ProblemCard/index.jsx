import React from 'react';
import {
  Card,
  ProblemTitle,
  ProblemWrapper,
  ProblemNumber,
  LanguageTag,
  Tag,
  TagWrapper,
  SolvedWrapper,
} from './style';
import { CommonTierImg } from 'style/commonStyle';
import { USER_PREFIX_URL } from 'utils/constants';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

/**
 * 사용자가 해결한 문제 카드 컴포넌트
 */
function ProblemCard({ user }) {
  // 유저의 오늘 푼 문제들
  const { data: problems } = useSWR(
    `${USER_PREFIX_URL}/info/today-solved?bojHandle=${user.bojHandle}`,
    fetcher,
  );

  if (!problems) return null;

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
              <ProblemWrapper>
                <ProblemNumber>
                  <CommonTierImg
                    src={`https://static.solved.ac/tier_small/${problem.tier}.svg`}
                    width="20"
                    height="20"
                  />
                  <div>{problem.problemId}</div>
                </ProblemNumber>
                <ProblemTitle>{problem.title}</ProblemTitle>
                {problem.problemId != 0 && (
                  <SolvedWrapper>
                    <TagWrapper>
                      {problem.tags &&
                        problem.tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
                    </TagWrapper>
                    <TagWrapper>
                      <LanguageTag>{problem.language}</LanguageTag>
                    </TagWrapper>
                  </SolvedWrapper>
                )}
              </ProblemWrapper>
            </a>
          </Card>
        ))}
    </>
  );
}

export default ProblemCard;
