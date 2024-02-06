import React from 'react';
import { Card, Title, Content, RoadmapItem, RoadmapTitle } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { ROADMAP_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import ProgressBar from 'components/ProgressBar';
import { NoPosts } from '../UserBoard/style';
import { isEmpty } from 'lodash';

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
      <Title>
        🗺️ 진행중인 로드맵 <span>{progressInfo.length} 개의 로드맵</span>
      </Title>
      <Content>
        {isEmpty(progressInfo) ? (
          <NoPosts>진행중인 로드맵이 없습니다.</NoPosts>
        ) : (
          progressInfo.map((roadmap, i) => (
            <RoadmapItem
              onClick={() => {
                navigate(`/roadmap/${roadmap.roadmapId}`);
              }}
              key={i}
            >
              <RoadmapTitle>{roadmap.name}</RoadmapTitle>
              <div>
                <ProgressBar percentage={roadmap.progress} />
              </div>
            </RoadmapItem>
          ))
        )}
      </Content>
    </Card>
  );
}

export default RoadmapCard;
