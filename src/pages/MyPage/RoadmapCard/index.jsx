import React from 'react';
import { Card, Title, Content } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { ROADMAP_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import ProgressBar from 'components/ProgressBar';

/**
 * 마이페이지 진행 중 로드맵 카드
 */
function RoadmapCard() {
  const navigate = useNavigate();
  const { bojHandle } = useParams();

  const { data: progressInfo } = useSWR(
    `${ROADMAP_PREFIX_URL}/progress/user?bojHandle=${bojHandle}`,
    fetcher,
  );

  if (!progressInfo) return null;

  return (
    <Card>
      <Title>진행중인 로드맵</Title>
      <Content>
        {progressInfo.map((roadmap) => (
          <div
            onClick={() => {
              navigate(`/roadmap/${roadmap.roadmapId}`);
            }}
          >
            {roadmap.name}
            <div>
              <ProgressBar percentage={roadmap.progress} />
            </div>
          </div>
        ))}
      </Content>
    </Card>
  );
}

export default RoadmapCard;
