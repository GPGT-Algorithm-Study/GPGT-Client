import React, { useEffect, useState } from 'react';
import { Card, TitleDiv, TagWrapper, ProgressBarWrapper } from './style';
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'components/ProgressBar';
import { ROADMAP_PREFIX_URL, USER_PREFIX_URL } from 'utils/constants';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

function RoadmapCard({ roadmapInfo }) {
  const navigate = useNavigate();
  // 사용자별 진행도 TODO: api 수정 필요
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const { data: progressInfo } = useSWR(
    loginUser
      ? `${ROADMAP_PREFIX_URL}/progress/user?bojHandle=${loginUser.claim}`
      : null,
    fetcher,
  );
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    if (!progressInfo) return;
    const idx = progressInfo.findIndex(
      (item) => item.roadmapId === roadmapInfo.id,
    );
    if (idx == -1) return;
    setPercentage(progressInfo[idx].progress);
  }, [progressInfo]);

  return (
    <Card
      onClick={() => {
        navigate(`${roadmapInfo.id}`);
      }}
    >
      <TitleDiv>
        <div>{roadmapInfo.name}</div>
        <ProgressBarWrapper>
          {percentage !== 0 && <ProgressBar percentage={percentage} />}
        </ProgressBarWrapper>
      </TitleDiv>
      <TagWrapper>
        {roadmapInfo.tags.map((tag, i) => (
          <div key={i}>#{tag.name} </div>
        ))}
      </TagWrapper>
    </Card>
  );
}

export default RoadmapCard;
