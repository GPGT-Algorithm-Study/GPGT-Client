import { getAllUsers } from 'api/user';
import useFetch from 'hooks/useFetch';
import React from 'react';
import { Card, Content, Title, User, ScrollButton, UserWrapper } from './style';
import SolvedIcon from 'components/SolvedIcon';
import useScroll from 'hooks/useScroll';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

function TodaySolved() {
  const [users] = useFetch(getAllUsers, []);
  const [
    leftArrowHovering,
    rightArrowHovering,
    setArrowHovering,
    horizontalScrollRef,
    handleNextButtonClick,
  ] = useScroll();

  return (
    <Card>
      <Title>오늘의 문제 해결 현황</Title>
      <Content>
        <UserWrapper ref={horizontalScrollRef}>
          {users.map((user) => (
            <User key={user.bojHandle}>
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
