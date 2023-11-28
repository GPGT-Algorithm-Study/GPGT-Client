import React, { useCallback } from 'react';
import { CommonProfileImage } from 'style/commonStyle';
import { Title, Content, UserWrapper, User, ScrollButton, Card } from './style';
import useScroll from 'hooks/useScroll';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { USER_PREFIX_URL } from 'utils/constants';

function YesterdayUnsolved() {
  const { data: users } = useSWR(
    `/api/v1/stat/user/yesterday-unsolved-users`,
    fetcher,
  );

  const { data: allUsers } = useSWR(`${USER_PREFIX_URL}/info/all`, fetcher);

  const [
    leftArrowHovering,
    rightArrowHovering,
    setArrowHovering,
    horizontalScrollRef,
    handleNextButtonClick,
  ] = useScroll();
  const onClickProfileImg = useCallback((e, bojHandle) => {
    e.preventDefault();
    const url = `https://solved.ac/profile/${bojHandle}`;
    window.open(url, '_blank');
  }, []);

  if (!users || !allUsers) return null;

  return (
    <Card>
      <Title>어제 안 푼 사람들</Title>
      <Content>
        <UserWrapper ref={horizontalScrollRef}>
          {users.map((user) => {
            if (
              allUsers.some(
                (item) =>
                  item.bojHandle === user.bojHandle && item.warning === 4,
              )
            )
              return null;
            return (
              <User key={user.notionId}>
                <div>
                  {user.notionId} {user.emoji}
                </div>
                <CommonProfileImage
                  width="50"
                  height="50"
                  src={
                    user.profileImg != 'null'
                      ? user.profileImg
                      : 'https://static.solved.ac/misc/360x360/default_profile.png'
                  }
                  onClick={(e) => onClickProfileImg(e, user.bojHandle)}
                  style={{ cursor: 'pointer' }}
                ></CommonProfileImage>
              </User>
            );
          })}
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
