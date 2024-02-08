import React from 'react';
import { Card, MaxStreak, StreakInfoText, StreakTitle } from './style';
import useSWR from 'swr';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import Streak from 'components/Streak';

/**
 * 마이페이지 스트릭 정보 카드
 */
function StreakCard({ userInfo }) {
  // 유저의 스트릭 잔디 정보
  const { data: randomStreak } = useSWR(
    `${USER_PREFIX_URL}/streak/grass?bojHandle=${userInfo.bojHandle}`,
    fetcher,
  );

  return (
    <Card>
      <StreakTitle>🌱 랜덤 스트릭</StreakTitle>
      <div>
        <StreakInfoText>
          <span>{userInfo.currentRandomStreak}일 </span> 연속 랜덤 문제 해결
        </StreakInfoText>
        {randomStreak && (
          <Streak
            randomStreak={randomStreak}
            maxStreak={365}
            line={5}
            width={1470}
            height={110}
          />
        )}
        <MaxStreak>
          최장<span> {userInfo.maxRandomStreak}</span>일
        </MaxStreak>
      </div>
    </Card>
  );
}

export default StreakCard;
