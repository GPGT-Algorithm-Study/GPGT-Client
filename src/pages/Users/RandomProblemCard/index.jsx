import React, { useState, useCallback, useEffect } from 'react';
import { isEmpty } from 'lodash';
import SolvedIcon from 'components/SolvedIcon';
import Switch from 'react-switch';
import {
  Card,
  CardContent,
  TitleWrapper,
  Title,
  ProblemTitle,
  ProblemWrapper,
  Tag,
  TagWrapper,
  NoRandomProblem,
  TagSwitchWrapper,
  ProblemNumber,
  SolvedWrapper,
} from './style';
import { BiRefresh } from 'react-icons/bi';
import { CommonTierImg } from 'style/commonStyle';
import RefreshModalContent from './RefreshModalContent';
import useSWR from 'swr';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import Confirm from 'layouts/Confirm';

/**
 * 사용자의 랜덤 문제 카드 컴포넌트
 */
function RandomProblemCard({ user, changePoint, background }) {
  const [showTags, setShowTags] = useState(false);
  const [problem, setProblem] = useState({});
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );

  // 유저의 랜덤 문제
  const { data: randomProblem } = useSWR(
    `${USER_PREFIX_URL}/streak/streak?bojHandle=${user.bojHandle}`,
    fetcher,
  );

  // 랜덤 문제 데이터 가공
  useEffect(() => {
    if (!randomProblem && isEmpty(randomProblem)) return;
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

  /**
   * 새로 고침 버튼 클릭 핸들러
   */
  const onClickRefreshButton = useCallback((e) => {
    e.preventDefault();
    setShowRefreshModal(true);
  }, []);

  if (!randomProblem || !loginUser) return null;

  return (
    <Card background={background}>
      {problem.problemId == 0 ? (
        <div>
          <NoRandomProblem>
            <div>랜덤 문제 범위가 설정되지 않았습니다.</div>
          </NoRandomProblem>
          <CardContent isBlur>
            <TitleWrapper>
              <Title />
            </TitleWrapper>
            <ProblemTitle />
            <ProblemWrapper>
              <SolvedIcon solved={problem.isTodayRandomSolved} />
            </ProblemWrapper>
          </CardContent>
        </div>
      ) : (
        <a
          href={
            problem.problemId != 0
              ? `https://www.acmicpc.net/problem/${problem.problemId}`
              : ''
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardContent>
            <TitleWrapper>
              <Title>
                📩 오늘의 랜덤 문제
                <p> +{problem.point} P</p>
                {loginUser.claim === user.bojHandle &&
                  problem.problemId != 0 &&
                  !problem.isTodayRandomSolved && (
                    <BiRefresh
                      size="21"
                      onClick={onClickRefreshButton}
                      style={{ color: 'var(--color-text-gray)' }}
                    />
                  )}
              </Title>
              <TagSwitchWrapper>
                <span>태그</span>
                <Switch
                  onChange={onClickTagButton}
                  checked={showTags}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  width={40}
                  height={20}
                  onColor="#3362c5"
                  offColor="#d2d2d2"
                  disabled={problem.problemId == 0}
                />
              </TagSwitchWrapper>
            </TitleWrapper>
            <ProblemWrapper>
              <ProblemNumber>
                {problem.level && (
                  <CommonTierImg
                    src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
                    width="20"
                    height="20"
                  />
                )}
                <div>{problem.problemId}</div>
              </ProblemNumber>
              <ProblemTitle>{problem.titleKo}</ProblemTitle>
              <SolvedWrapper>
                <TagWrapper>
                  {problem.tags &&
                    showTags &&
                    problem.tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
                </TagWrapper>
                <SolvedIcon solved={problem.isTodayRandomSolved} />
              </SolvedWrapper>
            </ProblemWrapper>
          </CardContent>
        </a>
      )}
      <Confirm
        show={showRefreshModal}
        onCloseModal={() => {
          setShowRefreshModal(false);
        }}
      >
        <RefreshModalContent
          onCloseModal={() => {
            setShowRefreshModal(false);
          }}
          changePoint={changePoint}
        />
      </Confirm>
    </Card>
  );
}

export default RandomProblemCard;
