import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  ProfileImage,
  UserInfo,
  SolvedInfo,
  Warning,
  StreakSolved,
  RandomStreakInfo,
  Line,
  MaxStreak,
  WarningMsg,
  WarningWrapper,
  ToggleButton,
  IconWrapper,
  ProfileWrapper,
  Point,
  FlexWrapper,
  TierWrapper,
  CenterConatiner,
} from './style';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { CommonTierImg } from 'style/commonStyle';
import SolvedIcon from 'components/SolvedIcon';
import TeamIcon from 'components/TeamIcon';
import Streak from 'components/Streak';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { USER_PREFIX_URL } from 'utils/constants';

/**
 * 사용자 정보 카드 컴포넌트
 */
function UserCard({ user, toggleShowProblemsId, showProblemsId }) {
  const MAX_STREAK = 102;
  // 유저의 스트릭 잔디 정보
  const { data: randomStreak } = useSWR(
    `${USER_PREFIX_URL}/streak/grass?bojHandle=${user.bojHandle}`,
    fetcher,
  );

  const clickAcLogo = useCallback((e) => {
    e.preventDefault();
    const url = `https://solved.ac/profile/${user.bojHandle}`;
    window.open(url, '_blank');
  }, []);

  console.log(user);

  return (
    <Card>
      <Link to={`/my-page/${user.bojHandle}`}>
        {/* 상단 유저 아이디, 포인트, 프로필 이미지 */}
        <UserInfo>
          <ProfileWrapper>
            <div>
              <ProfileImage
                width={70}
                height={70}
                src={
                  user.profileImg != 'null'
                    ? user.profileImg
                    : 'https://static.solved.ac/misc/360x360/default_profile.png'
                }
                isWarning={user.warning == 4 && !user.manager}
              />
            </div>
            <div className="id-wrapper">
              <div className="user-id">
                {user.notionId} {user.emoji}
              </div>
              <div className="boj-handle" onClick={clickAcLogo}>
                <img src="https://static.solved.ac/logo.svg" width={35} />
                <span>{user.bojHandle}</span>
                <Point>
                  <span className="point-icon">P</span>
                  <span className="points">{user.point}</span>
                </Point>
              </div>
            </div>
          </ProfileWrapper>
          <IconWrapper>
            {(user.team == 1 || user.team == 0) && (
              <TeamIcon team={user.team} width={35} />
            )}
          </IconWrapper>
        </UserInfo>

        {/* 가운데 경고, 티어, 스트릭, 푼 문제 수 정보 */}
        <SolvedInfo>
          <FlexWrapper>
            <CenterConatiner>
              {user.manager && user.warning == 4 ? null : (
                <WarningWrapper>
                  {[...Array(3)].map((_, i) => (
                    <Warning key={i} warning={i + 1 <= user.warning} />
                  ))}
                </WarningWrapper>
              )}
              {user.warning == 4 ? (
                !user.manager ? (
                  <WarningMsg>BLOCKED</WarningMsg>
                ) : (
                  <p>
                    🛠️<b>관리자</b>🛠️
                  </p>
                )
              ) : null}
            </CenterConatiner>
            <TierWrapper>
              <CommonTierImg
                src={`https://static.solved.ac/tier_small/${user.tier}.svg`}
                width="40"
                height="40"
              />
              <StreakSolved>
                <div>
                  <span>streak</span> &nbsp;{user.currentStreak}
                </div>
                <div>
                  <span>solved</span> &nbsp;{user.totalSolved}
                </div>
              </StreakSolved>
            </TierWrapper>
          </FlexWrapper>
          <SolvedIcon solved={user.isTodaySolved} />
        </SolvedInfo>
      </Link>
      <Line />
      {/* 맨 밑에 랜덤 스트릭 정보 */}
      <RandomStreakInfo>
        <div>
          Random Streak <span>{user.currentRandomStreak}</span> days
        </div>
        {randomStreak && (
          <Streak
            randomStreak={randomStreak}
            maxStreak={MAX_STREAK}
            line={3}
            width={680}
            height={65}
          />
        )}
        <MaxStreak>
          최장<span> {user.maxRandomStreak}</span>일
        </MaxStreak>
      </RandomStreakInfo>
      <ToggleButton
        onClick={(e) => {
          e.preventDefault();
          toggleShowProblemsId(user.notionId);
        }}
      >
        <span>
          {!showProblemsId[user.notionId] && <IoIosArrowDown />}
          {showProblemsId[user.notionId] && <IoIosArrowUp />}
        </span>
      </ToggleButton>
    </Card>
  );
}

export default UserCard;
