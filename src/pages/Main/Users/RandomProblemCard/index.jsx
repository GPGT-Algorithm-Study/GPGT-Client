import React, { useState, useCallback } from 'react';
import SolvedIcon from '../../../../components/SolvedIcon';
import Switch from 'react-switch';
import {
  Card,
  CardContent,
  Title,
  ProblemTitle,
  ProblemWrapper,
  Tag,
  TagWrapper,
  NoRandomProblem,
  TagSwitchWrapper,
} from './style';
import { TierImg } from '../UserCard/style';

/**
 * 사용자의 랜덤 문제 카드 컴포넌트
 */
function RandomProblemCard({ problem }) {
  const [showTags, setShowTags] = useState(false);

  /**
   * 태그 숨기기 토글 버튼 핸들러
   */
  const onClickTagButton = useCallback(() => {
    setShowTags((prev) => !prev);
  }, []);

  return (
    <Card>
      {problem.problemId == 0 && (
        <NoRandomProblem>
          <div>랜덤 문제 범위가 설정되지 않았습니다.</div>
        </NoRandomProblem>
      )}
      <CardContent isBlur={problem.problemId == 0}>
        <Title>
          <div>
            오늘의 랜덤 문제
            <p> +{problem.point} P</p>
          </div>
          <TagSwitchWrapper>
            <span>Tags</span>
            <Switch
              onChange={onClickTagButton}
              checked={showTags}
              checkedIcon={false}
              uncheckedIcon={false}
              width={40}
              height={20}
              onColor="#69b5f8"
              offColor="#d2d2d2"
            />
          </TagSwitchWrapper>
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
              showTags &&
              problem.tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
          </TagWrapper>
          <SolvedIcon solved={problem.isTodayRandomSolved} />
        </ProblemWrapper>
      </CardContent>
    </Card>
  );
}

export default RandomProblemCard;
