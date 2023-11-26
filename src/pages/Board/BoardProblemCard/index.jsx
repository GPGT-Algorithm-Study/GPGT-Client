import React from 'react';
import { Card, ProblemTitle, ProblemWrapper, Tag, TagWrapper } from './style';
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
          <ProblemTitle>
            <CommonTierImg
              src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
              width="20"
              height="20"
            />
            <p>
              {problem.problemId != 0 && `${problem.problemId}번 : `}
              {problem.titleKo}
            </p>
          </ProblemTitle>
          {problem.problemId != 0 && (
            <ProblemWrapper>
              <TagWrapper>
                {problem.tags &&
                  problem.tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
              </TagWrapper>
            </ProblemWrapper>
          )}
        </a>
      </Card>
    </div>
  );
}

export default BoardProblemCard;
