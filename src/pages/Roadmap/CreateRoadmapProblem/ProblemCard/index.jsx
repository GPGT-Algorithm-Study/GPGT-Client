import React from 'react';
import { Card, ProblemDiv, ProblemTitle, Container } from './style';
import useSWR from 'swr';
import { PRB_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import { CommonTierImg } from 'style/commonStyle';

function ProbelmCard({ problemInfo, deleteProblem }) {
  const { data: problem } = useSWR(
    `${PRB_PREFIX_URL}/find?problemId=${problemInfo.problemId}`,
    fetcher,
  );

  return (
    <Card>
      {problem && (
        <Container>
          <ProblemDiv>
            <span>{problemInfo.index}</span>
            <CommonTierImg
              src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
              width="20"
              height="20"
            />
            {problem.problemId}번<ProblemTitle>{problem.titleKo}</ProblemTitle>
          </ProblemDiv>
          <span onClick={deleteProblem}>&times;</span>
        </Container>
      )}
    </Card>
  );
}

export default ProbelmCard;
