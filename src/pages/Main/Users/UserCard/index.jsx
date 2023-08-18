import React, { useCallback, useEffect, useState, useRef } from 'react';
import useFetch from 'hooks/useFetch';
import { getUserRandomStreakGrass } from 'api/user';
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
  ToggleButton,
  ScrollButton,
  IconWrapper,
  ProfileWrapper,
} from './style';
import {
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
  FaChevronLeft,
} from 'react-icons/fa';
import StreakIcon from './StreakIcon';
import StreakTooltip from './StreakTooltip';
import SolvedIcon from 'components/SolvedIcon';
import TeamIcon from 'components/TeamIcon';

/**
 * 사용자 정보 카드 컴포넌트
 */
function UserCard({ user, toggleShowProblemsId, showProblemsId }) {
  const MAX_STREAK = 102;
  const [streakList, setStreakList] = useState([]);
  const refArr = [...Array(MAX_STREAK)].map((_) => useRef());
  const [hoveringStreakIdx, setHoveringStreakIdx] = useState(-1);
  const [leftArrowHovering, setLeftArrowHovering] = useState(false);
  const [rightArrowHovering, setRightArrowHovering] = useState(false);
  const horizontalScrollRef = useRef();
  // 유저의 스트릭 잔디 정보
  const [randomStreak] = useFetch(
    getUserRandomStreakGrass,
    {
      bojHandle: user.bojHandle,
    },
    [],
  );

  /**
   * 스트릭 좌우 스크롤 버튼 클릭 리스너
   */
  const handleNextButtonClick = useCallback((nextType) => {
    if (!horizontalScrollRef.current) return;
    if (nextType === 'prev') {
      horizontalScrollRef.current.scrollTo({
        left:
          horizontalScrollRef.current.scrollLeft -
          horizontalScrollRef.current.offsetWidth,
        behavior: 'smooth',
      });
    } else {
      horizontalScrollRef.current.scrollTo({
        left:
          horizontalScrollRef.current.scrollLeft +
          horizontalScrollRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  });

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
        const streakDate = moment(getPreviousDate(MAX_STREAK - i - 1));
        const formatDate = moment(streakDate).format('YYYY-MM-DD');
        const solved =
          streakInfo.hasOwnProperty(formatDate) && streakInfo[formatDate];
        return {
          date: formatDate,
          x: parseInt(i / 3) * 20 + 1,
          y: (i % 3) * 20 + 1,
          solved: solved,
        };
      }),
    );
  }, [randomStreak]);

  return (
    <div>
      <Card>
        <a href={`https://solved.ac/profile/${user.bojHandle}`}>
          {/* 상단 유저 아이디, 포인트, 프로필 이미지 */}
          <UserInfo>
            <ProfileWrapper>
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
        </a>
        {/* 맨 밑에 랜덤 스트릭 정보 */}
        <RandomStreakInfo>
          <div>
            Random Streak <span>{user.currentRandomStreak}</span> days
          </div>
          <Streak>
            <ScrollButton
              onClick={() => {
                handleNextButtonClick('prev');
              }}
              onMouseOver={() => setLeftArrowHovering(true)}
              onMouseOut={() => setLeftArrowHovering(false)}
              type="prev"
            >
              {leftArrowHovering && (
                <div>
                  <FaChevronLeft />
                </div>
              )}
            </ScrollButton>
            <div ref={horizontalScrollRef}>
              <svg height="65" width="680" overflow="auto">
                {streakList.map((streak, i) => (
                  <React.Fragment key={`${streak.date}-fragment`}>
                    <StreakIcon
                      ref={refArr[i]}
                      isHovering={hoveringStreakIdx == i}
                      onMouseEnter={() => {
                        setHoveringStreakIdx(i);
                      }}
                      onMouseOut={() => {
                        setHoveringStreakIdx(-1);
                      }}
                      streak={streak}
                    />
                  </React.Fragment>
                ))}
                {/* 툴팁 */}
                {hoveringStreakIdx != -1 && (
                  <StreakTooltip streak={streakList[hoveringStreakIdx]} />
                )}
              </svg>
            </div>
            <ScrollButton
              onClick={() => {
                handleNextButtonClick('next');
              }}
              onMouseOver={() => setRightArrowHovering(true)}
              onMouseOut={() => setRightArrowHovering(false)}
              type="next"
            >
              {rightArrowHovering && (
                <div>
                  <FaChevronRight />
                </div>
              )}
            </ScrollButton>
          </Streak>
          <MaxStreak>
            최장<span> {user.maxRandomStreak}</span>일
          </MaxStreak>
        </RandomStreakInfo>
        <ToggleButton
          onClick={() => {
            toggleShowProblemsId(user.notionId);
          }}
        >
          <span>
            {!showProblemsId[user.notionId] && <FaChevronDown />}
            {showProblemsId[user.notionId] && <FaChevronUp />}
          </span>
        </ToggleButton>
      </Card>
    </div>
  );
}

export default UserCard;
