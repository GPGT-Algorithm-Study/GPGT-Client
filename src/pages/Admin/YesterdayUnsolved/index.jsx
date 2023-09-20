import React from 'react';
import { CommonProfileImage } from 'style/commonStyle';
import { Title, Content, UserWrapper, User, ScrollButton, Card } from './style';
import useFetch from 'hooks/useFetch';
import useScroll from 'hooks/useScroll';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { getYesterdayUnsolvedUsers } from 'api/statistics';
import { Link } from 'react-router-dom';

function YesterdayUnsolved() {
  const [users] = useFetch(getYesterdayUnsolvedUsers, []);

  const [
    leftArrowHovering,
    rightArrowHovering,
    setArrowHovering,
    horizontalScrollRef,
    handleNextButtonClick,
  ] = useScroll();
  return (
    <Card>
      <Title>어제 안 푼 사람들</Title>
      <Content>
        <UserWrapper ref={horizontalScrollRef}>
          {users.map((user) => (
            <User key={user.notionId}>
              <div>
                {user.notionId} {user.emoji}
              </div>
              <Link to={`/my-page/${user.bojHandle}`}>
                <CommonProfileImage
                  width="50"
                  height="50"
                  src={
                    user.profileImg != 'null'
                      ? user.profileImg
                      : 'https://static.solved.ac/misc/360x360/default_profile.png'
                  }
                ></CommonProfileImage>
              </Link>
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

export default YesterdayUnsolved;
