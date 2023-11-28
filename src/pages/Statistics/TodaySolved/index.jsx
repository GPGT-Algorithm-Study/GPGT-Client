import React from 'react';
import { Card, Content, Title, User, ScrollButton, UserWrapper } from './style';
import SolvedIcon from 'components/SolvedIcon';
import useScroll from 'hooks/useScroll';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import useSWR from 'swr';
import { STAT_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';

function TodaySolved() {
  const { data: users } = useSWR(
    `${STAT_PREFIX_URL}/graph/is-today-solved`,
    fetcher,
  );

  const [
    leftArrowHovering,
    rightArrowHovering,
    setArrowHovering,
    horizontalScrollRef,
    handleNextButtonClick,
  ] = useScroll();

  if (!users) {
    return null;
  }

  return (
    <Card>
      <Title>오늘의 문제 해결 현황</Title>
      <Content>
        <UserWrapper ref={horizontalScrollRef}>
          {users.map((user) => (
            <User key={user.notionId}>
              <div>
                {user.notionId} {user.emoji}
              </div>
              <SolvedIcon solved={user.isTodaySolved} />
            </User>
          ))}
        </UserWrapper>
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
      </Content>
    </Card>
  );
}

export default TodaySolved;
