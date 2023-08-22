import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Title } from './style';
import { CommonTierImg } from 'commonStyle';

/**
 * 추천된 문제 정보 컴포넌트
 */
function ProblemResult({ problem }) {
  const linkPrefix = 'https://www.acmicpc.net/problem/';
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // 레벨에 따른 티어 이미지 설정
    if (problem.level)
      setImageUrl(`https://static.solved.ac/tier_small/${problem.level}.svg`);
  }, [problem]);

  // 문제 정보가 없을 경우
  if (isEmpty(problem)) return <></>;
  // 추천할 문제가 없을 경우
  if (!problem.id) return <div>추천해 줄 문제가 없습니다.</div>;

  return (
    <div>
      <Title href={`${linkPrefix}${problem.id}`}>
        <CommonTierImg width={25} height={25} src={imageUrl} />
        <span>
          {problem.id}번 : {problem.title}
        </span>
      </Title>
    </div>
  );
}

export default ProblemResult;
