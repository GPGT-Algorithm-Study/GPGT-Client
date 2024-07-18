import React from 'react';
import { CommonProfileImage } from 'style/commonStyle';
import { Card, RankInfo, RankNumber, TopThreeWrapper, NameInfo } from './style';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import TopThreeCard from './TopThreeCard';
import PageTitle from 'components/PageTitle';

function Ranking() {
  const { data: rankingList } = useSWR(
    `api/v1/stat/user/rank/most-solved`,
    fetcher,
  );

  return (
    <div>
      <PageTitle showLeftTime title="랭킹" />
      {rankingList && (
        <>
          <TopThreeWrapper>
            {rankingList.slice(0, 3).map((user, i) => (
              <TopThreeCard user={user} rank={i + 1} key={i} />
            ))}
          </TopThreeWrapper>
          <Card>
            {rankingList.slice(3).map((user, i) => (
              <RankInfo key={i}>
                <div>
                  <RankNumber>{i + 4}</RankNumber>
                  <CommonProfileImage
                    width={42}
                    height={42}
                    src={
                      user.profileImg != 'null'
                        ? user.profileImg
                        : 'https://static.solved.ac/misc/360x360/default_profile.png'
                    }
                  />
                  <NameInfo>
                    {user.notionId}&nbsp;{user.emoji}
                    <span>{user.bojHandle}</span>
                  </NameInfo>
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
