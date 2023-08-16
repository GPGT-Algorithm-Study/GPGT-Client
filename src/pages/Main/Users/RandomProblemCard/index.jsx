import React from 'react';
import SolvedIcon from '../../../../components/SolvedIcon';
import {
  Card,
  CardContent,
  Title,
  ProblemTitle,
  ProblemWrapper,
  Tag,
  TagWrapper,
  NoRandomProblem,
} from './style';
import { TierImg } from '../UserCard/style';

/**
 * 사용자의 랜덤 문제 카드 컴포넌트
 */
function RandomProblemCard({ problem }) {
  return (
    <Card>
      {problem.problemId == 0 && (
        <NoRandomProblem>
          <div>랜덤 문제 범위가 설정되지 않았습니다.</div>
        </NoRandomProblem>
      )}
      <CardContent isBlur={problem.problemId == 0}>
        <Title>
          오늘의 랜덤 문제
          <p> +{problem.point} P</p>
        </Title>
        <ProblemTitle>
          {problem.level && (
            <TierImg
              src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
              width="20px"
              height="20px"
            />
          )}
          <p>
            {problem.problemId}번 : {problem.titleKo}
          </p>
        </ProblemTitle>
        <ProblemWrapper>
          <TagWrapper>
            {problem.tags &&
              problem.tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
          </TagWrapper>
          <SolvedIcon solved={problem.isTodayRandomSolved} />
        </ProblemWrapper>
      </CardContent>
    </Card>
  );
}

export default RandomProblemCard;
