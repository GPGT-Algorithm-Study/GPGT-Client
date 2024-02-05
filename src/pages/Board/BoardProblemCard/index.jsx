import React from 'react';
import {
  Card,
  ProblemTitle,
  ProblemWrapper,
  Tag,
  TagWrapper,
  ProblemNumber,
  SolvedWrapper,
} from './style';
import { CommonTierImg } from 'style/commonStyle';

/**
 * 게시판 용 문제 카드
 */
function BoardProblemCard({ problem }) {
  return (
    <div>
      <Card>
        <a
          href={`https://www.acmicpc.net/problem/${problem.problemId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ProblemWrapper>
            <ProblemNumber>
              <CommonTierImg
                src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
                width="20"
                height="20"
              />
              <div>{problem.problemId}</div>
            </ProblemNumber>
            <ProblemTitle>{problem.titleKo}</ProblemTitle>
            {problem.problemId != 0 && (
              <SolvedWrapper>
                <TagWrapper>
                  {problem.tags &&
                    problem.tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
                </TagWrapper>
              </SolvedWrapper>
            )}
          </ProblemWrapper>
        </a>
      </Card>
    </div>
  );
}

export default BoardProblemCard;
