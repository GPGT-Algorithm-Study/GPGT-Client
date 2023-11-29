import React from 'react';
import { Card, ProblemIdDiv, ProblemTitle } from './style';
import useSWR from 'swr';
import { PRB_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import { TagWrapper } from '../../RoadmapCard/style';
import { CommonTierImg } from 'style/commonStyle';

function ProbelmCard({ problemInfo }) {
  const { data: problem } = useSWR(
    `${PRB_PREFIX_URL}/find?problemId=${problemInfo.problemId}`,
    fetcher,
  );

  return (
    <Card>
      {problem && (
        <>
          <div>
            <ProblemIdDiv>
              <CommonTierImg
                src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
                width="20"
                height="20"
              />
              {problem.problemId}번
            </ProblemIdDiv>
            <ProblemTitle>{problem.titleKo}</ProblemTitle>
          </div>
          <TagWrapper>
            {problem.tags.map((tag, i) => (
              <div key={i}>#{tag} </div>
            ))}
          </TagWrapper>
        </>
      )}
    </Card>
  );
}

export default ProbelmCard;
