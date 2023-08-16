import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import {
  Card,
  ProfileImage,
  UserInfo,
  SolvedInfo,
  Warning,
  TierImg,
  StreakSolved,
  RandomStreakInfo,
  Line,
  MaxStreak,
  Streak,
  WarningMsg,
  WarningWrapper,
} from './style';
import SolvedIcon from '../../../../components/SolvedIcon';

/**
 * 사용자 정보 카드 컴포넌트
 */
function UserCard({ user, randomStreak }) {
  const MAX_STREAK = 51;
  const [streakList, setStreakList] = useState([]);

  /**
   * 오늘 날짜에서 i번째 이전 날짜를 반환한다.
   */
  const getPreviousDate = useCallback((i) => {
    const today = new Date();
    // 오전 6시 기준으로 오늘이 나뉨. 오전 6시 이전이라면 어제를 오늘로 친다.
    if (today.getHours() < 6) {
      today.setDate(today.getDate() - 1);
    }
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - i);
    return previousDate;
  }, []);

  useEffect(() => {
    // 스트릭 정보 생성. 스트릭의 날짜를 key값으로 가지는 객체를 생성한다.
    const streakInfo = randomStreak.reduce((result, item) => {
      result[item.date] = item.grassInfo;
      return result;
    }, {});
    // MAX_STREAK개수 만큼 스트릭을 생성한다.
    // 스트릭 정보에는 날짜, x,y좌표, 그 날짜에 해결했는지 여부가 포함된다.
    setStreakList(
      [...Array(MAX_STREAK)].map((_, i) => {
        const streakDate = getPreviousDate(MAX_STREAK - i - 1);
        const formatDate = moment(streakDate).format('YYYY-MM-DD');
        const solved =
          streakInfo.hasOwnProperty(formatDate) && streakInfo[formatDate];
        return {
          date: streakDate,
          x: parseInt(i / 3) * 20,
          y: (i % 3) * 20,
          solved: solved,
        };
      }),
    );
  }, [randomStreak]);

  return (
    <Card>
      {/* 상단 유저 아이디, 포인트, 프로필 이미지 */}
      <UserInfo>
        <div>
          <ProfileImage
            src={
              user.profileImg != 'null'
                ? user.profileImg
                : 'https://static.solved.ac/misc/360x360/default_profile.png'
            }
            isWarning={user.warning == 4}
          />
        </div>
        <div className="id-wrapper">
          <div className="user-id">
            {user.notionId} {user.emoji}
          </div>
          <div className="boj-handle">
            <span>{user.bojHandle}</span>
            <span className="point-icon">P</span>
            <span className="points">{user.point}</span>
          </div>
        </div>
      </UserInfo>

      {/* 가운데 경고, 티어, 스트릭, 푼 문제 수 정보 */}
      <SolvedInfo>
        <div>
          <WarningWrapper>
            {[...Array(3)].map((_, i) => (
              <Warning key={i} warning={i + 1 <= user.warning} />
            ))}
          </WarningWrapper>
          {user.warning == 4 && <WarningMsg>BLOCKED</WarningMsg>}
        </div>
        <div className="tier-wrapper">
          <TierImg
            src={`https://static.solved.ac/tier_small/${user.tier}.svg`}
            width="40px"
            height="40px"
          />
          <StreakSolved>
            <div>
              <span>streak</span> &nbsp;{user.currentStreak}
            </div>
            <div>
              <span>solved</span> &nbsp;{user.totalSolved}
            </div>
          </StreakSolved>
        </div>
        <SolvedIcon solved={user.isTodaySolved} />
      </SolvedInfo>
      <Line />

      {/* 맨 밑에 랜덤 스트릭 정보 */}
      <RandomStreakInfo>
        <div>
          Random Streak <span>{user.currentRandomStreak}</span> days
        </div>
        <Streak>
          <svg height="60" width="340">
            {streakList.map((streak) => (
              <rect
                key={streak.date}
                width="18"
                height="18"
                x={streak.x}
                y={streak.y}
                rx="5"
                fill={
                  streak.solved
                    ? 'var(--color-checked)'
                    : 'var(--color-unchecked)'
                }
                strokeWidth="2.5"
                stroke="transparent"
              ></rect>
            ))}
          </svg>
        </Streak>
        <MaxStreak>
          최장<span> {user.maxRandomStreak}</span>일
        </MaxStreak>
      </RandomStreakInfo>
    </Card>
  );
}

export default UserCard;
