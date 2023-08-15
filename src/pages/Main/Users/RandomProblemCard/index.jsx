import React from 'react';
import SolvedIcon from '../../../../components/SolvedIcon';
import {
  Card,
  Title,
  ProblemTitle,
  ProblemWrapper,
  Tag,
  TagWrapper,
} from './style';
import { TierImg } from '../UserCard/style';

/**
 * 사용자의 랜덤 문제 카드 컴포넌트
 */
function RandomProblemCard({ problem }) {
  const tags = ['구현', '그래프 이론', '그래프 탐색'];
  return (
    <Card>
      <Title>
        오늘의 랜덤 문제
        <p> +12 P</p>
      </Title>
      <ProblemTitle>
        <TierImg
          src="https://static.solved.ac/tier_small/15.svg"
          width="20px"
          height="20px"
        />
        <p>{problem.todayRandomProblemId}번 : 다리 만들기2</p>
      </ProblemTitle>
      <ProblemWrapper>
        <TagWrapper>
          {tags.map((tag) => (
            <Tag key={tag}>#{tag} </Tag>
          ))}
        </TagWrapper>
        <SolvedIcon solved={true} />
      </ProblemWrapper>
    </Card>
  );
}

export default RandomProblemCard;
