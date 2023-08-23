import React, { useState, useCallback, useEffect } from 'react';
import { isEmpty } from 'lodash';
import useFetch from 'hooks/useFetch';
import { getUserTodayRandomProblem } from 'api/user';
import SolvedIcon from 'components/SolvedIcon';
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
import { CommonTierImg } from 'style/commonStyle';

/**
 * 사용자의 랜덤 문제 카드 컴포넌트
 */
function RandomProblemCard({ user }) {
  const [showTags, setShowTags] = useState(false);
  const [problem, setProblem] = useState({});

  // 유저의 랜덤 문제
  const [randomProblem] = useFetch(
    getUserTodayRandomProblem,
    {
      bojHandle: user.bojHandle,
    },
    {},
  );

  // 랜덤 문제 데이터 가공
  useEffect(() => {
    if (isEmpty(randomProblem)) return;
    let { todayRandomProblem } = randomProblem;
    todayRandomProblem.isTodayRandomSolved = randomProblem.isTodayRandomSolved;
    if (todayRandomProblem.problemId == 0) {
      todayRandomProblem = {
        problemId: 0,
        titleKo: '랜덤 문제 제목',
        point: 10,
        tags: ['그래프 이론', '그래프 탐색'],
        level: 9,
      };
    }
    setProblem(todayRandomProblem);
  }, [randomProblem]);

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
      <a
        href={
          problem.problemId != 0
            ? `https://www.acmicpc.net/problem/${problem.problemId}`
            : ''
        }
      >
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
              <CommonTierImg
                src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
                width="20"
                height="20"
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
      </a>
    </Card>
  );
}

export default RandomProblemCard;
