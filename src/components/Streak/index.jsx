import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ScrollButton, StreakWrapper } from './style';
import moment from 'moment';
import StreakIcon from './StreakIcon';
import StreakTooltip from './StreakTooltip';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import useScroll from 'hooks/useScroll';

function Streak({ randomStreak, maxStreak }) {
  const refArr = [...Array(maxStreak)].map((_) => useRef());
  const [hoveringStreakIdx, setHoveringStreakIdx] = useState(-1);
  const [streakList, setStreakList] = useState([]);
  const [
    leftArrowHovering,
    rightArrowHovering,
    setArrowHovering,
    horizontalScrollRef,
    handleNextButtonClick,
  ] = useScroll();

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
      result[item.date] = item;
      return result;
    }, {});
    // maxStreak 개수 만큼 스트릭을 생성한다.
    // 스트릭 정보에는 날짜, x,y좌표, 그 날짜에 해결했는지 여부가 포함된다.
    setStreakList(
      [...Array(maxStreak)].map((_, i) => {
        const streakDate = moment(getPreviousDate(maxStreak - i - 1));
        const formatDate = moment(streakDate).format('YYYY-MM-DD');
        const solved =
          streakInfo.hasOwnProperty(formatDate) &&
          streakInfo[formatDate].grassInfo;
        const isFreeze = solved && streakInfo[formatDate].problemId == 0;
        return {
          date: formatDate,
          x: parseInt(i / 3) * 20 + 1,
          y: (i % 3) * 20 + 1,
          solved: solved,
          isFreeze: isFreeze,
        };
      }),
    );
  }, [randomStreak]);

  return (
    <StreakWrapper>
      <ScrollButton
        onClick={() => {
          handleNextButtonClick('prev');
        }}
        onMouseOver={() => setArrowHovering('prev', true)}
        onMouseOut={() => setArrowHovering('prev', false)}
        type="prev"
      >
        {leftArrowHovering && (
          <div>
            <FaChevronLeft />
          </div>
        )}
      </ScrollButton>
      <ScrollButton
        onClick={() => {
          handleNextButtonClick('next');
        }}
        onMouseOver={() => setArrowHovering('next', true)}
        onMouseOut={() => setArrowHovering('next', false)}
        type="next"
      >
        {rightArrowHovering && (
          <div>
            <FaChevronRight />
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
    </StreakWrapper>
  );
}

export default Streak;
