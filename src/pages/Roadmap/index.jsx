import React from 'react';
import { TitleDiv, Container, ContentDiv } from './style';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { ROADMAP_PREFIX_URL } from 'utils/constants';
import RoadmapCard from './RoadmapCard';

/**
 * 로드맵 페이지
 */
function Roadmap() {
  const { data: roadmapList } = useSWR(
    `${ROADMAP_PREFIX_URL}/search/all`,
    fetcher,
  );

  return (
    <Container>
      <TitleDiv>
        <div>
          로드맵을 선택해 주세요!
          <br />
          주차 별로 문제를 추천해 드릴게요
        </div>
        <button>로드맵 만들기</button>
      </TitleDiv>
      {roadmapList && (
        <ContentDiv>
          {roadmapList.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmapInfo={roadmap} />
          ))}
        </ContentDiv>
      )}
    </Container>
  );
}

export default Roadmap;
