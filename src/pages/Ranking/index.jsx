import React from 'react';
import LeftTime from 'components/LeftTime';
import {
  CommonFlexWrapper,
  CommonProfileImage,
  CommonTitle,
} from 'style/commonStyle';
import { Card, RankInfo, RankNumber, TopThreeWrapper } from './style';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import TopThreeCard from './TopThreeCard';

function Ranking() {
  const { data: rankingList } = useSWR(
    `api/v1/stat/user/rank/most-solved`,
    fetcher,
  );

  return (
    <div>
      <CommonFlexWrapper>
        <CommonTitle>랭킹</CommonTitle>
        <LeftTime />
      </CommonFlexWrapper>
      {rankingList && (
        <>
          <TopThreeWrapper>
            {rankingList.slice(0, 3).map((user, i) => (
              <TopThreeCard user={user} rank={i + 1} />
            ))}
          </TopThreeWrapper>
          <Card>
            {rankingList.slice(3).map((user, i) => (
              <RankInfo>
                <div>
                  <RankNumber>{i + 4}</RankNumber>
                  <CommonProfileImage
                    width={40}
                    height={40}
                    src={
                      user.profileImg != 'null'
                        ? user.profileImg
                        : 'https://static.solved.ac/misc/360x360/default_profile.png'
                    }
                  />
                  <div>
                    {user.notionId}&nbsp;{user.emoji}
                  </div>
                </div>
                <span>{user.totalSolved}문제 해결</span>
              </RankInfo>
            ))}
          </Card>
        </>
      )}
    </div>
  );
}

export default Ranking;
