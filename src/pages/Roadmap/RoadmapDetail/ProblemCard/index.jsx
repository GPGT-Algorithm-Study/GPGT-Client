import React from 'react';
import {
  Card,
  ProblemIdDiv,
  ProblemTitle,
  SolvedIconWrapper,
  BottomWrapper,
} from './style';
import useSWR from 'swr';
import { PRB_PREFIX_URL, USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import { TagWrapper } from '../../RoadmapCard/style';
import { CommonTierImg } from 'style/commonStyle';
import SolvedIcon from 'components/SolvedIcon';

function ProbelmCard({ problemInfo }) {
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const { data: problem } = useSWR(
    loginUser
      ? `${PRB_PREFIX_URL}/user/find?bojHandle=${loginUser.claim}&problemId=${problemInfo.problemId}`
      : null,
    fetcher,
  );

  return (
    <Card
      onClick={() => {
        window.open(
          `https://www.acmicpc.net/problem/${problem.problemId}`,
          '_blank',
        );
      }}
    >
      {problem && (
        <>
          <div>
            <ProblemIdDiv>
              <CommonTierImg
                src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
                width="18"
                height="18"
              />
              <div>{problem.problemId}</div>
            </ProblemIdDiv>
            <ProblemTitle>{problem.titleKo}</ProblemTitle>
          </div>
          <BottomWrapper>
            <TagWrapper>
              {problem.tags.map((tag, i) => (
                <div key={i}>#{tag} </div>
              ))}
            </TagWrapper>
            <SolvedIconWrapper>
              <SolvedIcon solved={problem.isSolved} />
            </SolvedIconWrapper>
          </BottomWrapper>
        </>
      )}
    </Card>
  );
}

export default ProbelmCard;
