import React from 'react';
import { CommonProfileImage } from 'style/commonStyle';
import { Title, Content, UserWrapper, User, ScrollButton } from './style';
import useFetch from 'hooks/useFetch';
import useScroll from 'hooks/useScroll';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { getYesterdayUnsolvedUsers } from 'api/statistics';

function YesterdayUnsolved() {
  //const [users] = useFetch(getYesterdayUnsolvedUsers, []);
  const users = [
    {
      bojHandle: 'emforhs0315',
      notionId: '성훈 조',
      profileImg: 'null',
      emoji: '👍',
    },
    {
      bojHandle: 'jake0104',
      notionId: '재현 주',
      profileImg: 'null',
      emoji: '🍷',
    },
    {
      bojHandle: 'seoheo',
      notionId: 'SY Heo',
      profileImg:
        'https://static.solved.ac/uploads/profile/seoheo-picture-1679724776174.png',
      emoji: '🚀',
    },
    {
      bojHandle: 'seoheo',
      notionId: 'SY Heo',
      profileImg:
        'https://static.solved.ac/uploads/profile/seoheo-picture-1679724776174.png',
      emoji: '🚀',
    },
    {
      bojHandle: 'seoheo',
      notionId: 'SY Heo',
      profileImg:
        'https://static.solved.ac/uploads/profile/seoheo-picture-1679724776174.png',
      emoji: '🚀',
    },
    {
      bojHandle: 'seoheo',
      notionId: 'SY Heo',
      profileImg:
        'https://static.solved.ac/uploads/profile/seoheo-picture-1679724776174.png',
      emoji: '🚀',
    },
    {
      bojHandle: 'seoheo',
      notionId: 'SY Heo',
      profileImg:
        'https://static.solved.ac/uploads/profile/seoheo-picture-1679724776174.png',
      emoji: '🚀',
    },
    {
      bojHandle: 'seoheo',
      notionId: 'SY Heo',
      profileImg:
        'https://static.solved.ac/uploads/profile/seoheo-picture-1679724776174.png',
      emoji: '🚀',
    },
    {
      bojHandle: 'seoheo',
      notionId: 'SY Heo',
      profileImg:
        'https://static.solved.ac/uploads/profile/seoheo-picture-1679724776174.png',
      emoji: '🚀',
    },
  ];
  const [
    leftArrowHovering,
    rightArrowHovering,
    setArrowHovering,
    horizontalScrollRef,
    handleNextButtonClick,
  ] = useScroll();
  return (
    <div>
      <Title>어제 안 푼 사람들</Title>
      <Content>
        <UserWrapper ref={horizontalScrollRef}>
          {users.map((user) => (
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
              ></CommonProfileImage>
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
    </div>
  );
}

export default YesterdayUnsolved;
