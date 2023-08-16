import React from 'react';
import {
  Card,
  ProblemTitle,
  ProblemWrapper,
  LanguageTag,
  Tag,
  TagWrapper,
} from './style';
import { TierImg } from '../UserCard/style';

/**
 * 사용자가 해결한 문제 카드 컴포넌트
 */
function ProblemCard({ problem }) {
  return (
    <Card>
      <ProblemTitle>
        <TierImg
          src={`https://static.solved.ac/tier_small/${problem.tier}.svg`}
          width="20px"
          height="20px"
        />
        <p>
          {problem.problemId}번 : {problem.title}
        </p>
      </ProblemTitle>
      <ProblemWrapper>
        <TagWrapper>
          {problem.tags &&
            problem.tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
        </TagWrapper>
        <LanguageTag>{problem.language}</LanguageTag>
      </ProblemWrapper>
    </Card>
  );
}

export default ProblemCard;
