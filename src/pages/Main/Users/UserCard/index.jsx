import React, { useCallback } from 'react';
import useFetch from 'hooks/useFetch';
import { getUserRandomStreakGrass } from 'api/user';
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
} from './style';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CommonTierImg } from 'style/commonStyle';
import SolvedIcon from 'components/SolvedIcon';
import TeamIcon from 'components/TeamIcon';
import Streak from 'components/Streak';

/**
 * 사용자 정보 카드 컴포넌트
 */
function UserCard({ user, toggleShowProblemsId, showProblemsId }) {
  const MAX_STREAK = 102;
  // 유저의 스트릭 잔디 정보
  const [randomStreak] = useFetch(getUserRandomStreakGrass, [], {
    bojHandle: user.bojHandle,
  });

  const clickAcLogo = useCallback((e) => {
    e.preventDefault();
    const url = `https://solved.ac/profile/${user.bojHandle}`;
    window.open(url, '_blank');
  }, []);

  return (
    <Link to={`/my-page/${user.bojHandle}`}>
      <Card>
        {/* 상단 유저 아이디, 포인트, 프로필 이미지 */}
        <UserInfo>
          <ProfileWrapper>
            <div>
              <ProfileImage
                width={80}
                height={80}
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
              <div className="boj-handle" onClick={clickAcLogo}>
                <img src="https://static.solved.ac/logo.svg" width={35} />
                <span>{user.bojHandle}</span>
                <span className="point-icon">P</span>
                <span className="points">{user.point}</span>
              </div>
            </div>
          </ProfileWrapper>
          <IconWrapper>
            <TeamIcon team={user.team} width={60} />
          </IconWrapper>
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
          </div>
          <SolvedIcon solved={user.isTodaySolved} />
        </SolvedInfo>
        <Line />
        {/* 맨 밑에 랜덤 스트릭 정보 */}
        <RandomStreakInfo>
          <div>
            Random Streak <span>{user.currentRandomStreak}</span> days
          </div>
          <Streak
            randomStreak={randomStreak}
            maxStreak={MAX_STREAK}
            line={3}
            width={680}
            height={65}
          />
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
            {!showProblemsId[user.notionId] && <FaChevronDown />}
            {showProblemsId[user.notionId] && <FaChevronUp />}
          </span>
        </ToggleButton>
      </Card>
    </Link>
  );
}

export default UserCard;
