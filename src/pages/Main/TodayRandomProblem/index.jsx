import React, { useState, useCallback, useEffect } from 'react';
import { isEmpty } from 'lodash';
import Switch from 'react-switch';
import {
  Card,
  TitleWrapper,
  Title,
  ProblemTitle,
  ProblemWrapper,
  Tag,
  TagWrapper,
  TagSwitchWrapper,
  ProblemSubInfo,
  ProblemNumber,
} from './style';
import { BiRefresh } from 'react-icons/bi';
import { CommonTierImg } from 'style/commonStyle';
import Modal from 'layouts/Modal';
import RefreshModalContent from 'pages/Users/RandomProblemCard/RefreshModalContent';
import useSWR from 'swr';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import Confirm from 'layouts/Confirm';

/**
 * 사용자의 랜덤 문제 카드 컴포넌트
 */
function TodayRandomProblem() {
  const [showTags, setShowTags] = useState(false);
  const [problem, setProblem] = useState({});
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );

  // 유저의 랜덤 문제
  const { data: randomProblem } = useSWR(
    loginUser
      ? `${USER_PREFIX_URL}/streak/streak?bojHandle=${loginUser.claim}`
      : '',
    fetcher,
  );

  // 랜덤 문제 데이터 가공
  useEffect(() => {
    if (!randomProblem && isEmpty(randomProblem)) return;
    let { todayRandomProblem } = randomProblem;
    todayRandomProblem.isTodayRandomSolved = randomProblem.isTodayRandomSolved;
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

  if (!randomProblem || !loginUser || problem.problemId == 0) return null;

  return (
    <Card>
      <a
        href={
          problem.problemId != 0
            ? `https://www.acmicpc.net/problem/${problem.problemId}`
            : ''
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <TitleWrapper>
          <Title>
            📩 오늘의 랜덤 문제
            <p> +{problem.point} P</p>
            {problem.problemId != 0 && !problem.isTodayRandomSolved && (
              <BiRefresh
                size="18"
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
          <ProblemSubInfo>
            <div>
              맞힌 사람 <span>{problem.acceptedUserCount}명</span>
            </div>
            <div>
              평균 시도 <span>{problem.averageTries}번</span>
            </div>
          </ProblemSubInfo>

          {problem.tags && showTags && (
            <TagWrapper>
              {problem.tags.map((tag) => (
                <Tag key={tag}>#{tag} </Tag>
              ))}
            </TagWrapper>
          )}
        </ProblemWrapper>
      </a>
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
        />
      </Confirm>
    </Card>
  );
}

export default TodayRandomProblem;
