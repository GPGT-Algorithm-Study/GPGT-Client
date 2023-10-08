import { getAllUserLastLogin } from 'api/user';
import useFetch from 'hooks/useFetch';
import React, { useCallback, useState } from 'react';
import {
  Card,
  Content,
  LastLoginDate,
  ScrollButton,
  Title,
  User,
  UserWrapper,
} from './style';
import useScroll from 'hooks/useScroll';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CommonProfileImage } from 'style/commonStyle';
import { format } from 'highcharts';
import dayjs from 'dayjs';

function LastLogin() {
  //const [users, reFetch] = useFetch(getAllUserLastLogin, []);
  const users = [
    {
      bojHandle: 'asdf016182',
      notionId: 'klloo',
      emoji: '🏖️',
      profileImg:
        'https://static.solved.ac/uploads/profile/asdf016182-picture-1683285947529.png',
      lastLoginDate: '2023-10-08T19:18:52',
    },
    {
      bojHandle: 'taipaise',
      notionId: '이동현',
      emoji: '🐾',
      profileImg:
        'https://static.solved.ac/uploads/profile/taipaise-picture-1683633399462.png',
      lastLoginDate: '2023-10-06T19:18:52',
    },
    {
      bojHandle: 'chltjwl22',
      notionId: '최서지',
      emoji: '🥑',
      profileImg:
        'https://static.solved.ac/uploads/profile/chltjwl22-picture-1682353272947.png',
      lastLoginDate: '2023-10-07T19:18:52',
    },
    {
      bojHandle: 'choish20',
      notionId: '최승헌',
      emoji: '🍞',
      profileImg: 'null',
      lastLoginDate: '2023-10-08T10:18:52',
    },
    {
      bojHandle: 'mathpaul3',
      notionId: 'Paul Eom',
      emoji: '🦊',
      profileImg:
        'https://static.solved.ac/uploads/profile/mathpaul3-picture-1645474246687.png',
      lastLoginDate: '2023-10-08T19:22:52',
    },
    {
      bojHandle: 'dkssudgkgl',
      notionId: '은정 방',
      emoji: '✱',
      profileImg: 'null',
      lastLoginDate: '2023-10-08T19:23:52',
    },
    {
      bojHandle: 'jin20fd',
      notionId: '성유진',
      emoji: '💫',
      profileImg: 'null',
      lastLoginDate: '2023-10-08T19:18:55',
    },
    {
      bojHandle: 'ss001015',
      notionId: 'RubyTubi',
      emoji: '✏️',
      profileImg:
        'https://static.solved.ac/uploads/profile/ss001015-picture-1673075526199.png',
      lastLoginDate: '2023-10-08T19:18:51',
    },
    {
      bojHandle: 'hdaisywd',
      notionId: 'Dahee Hong',
      emoji: '☃️',
      profileImg:
        'https://static.solved.ac/uploads/profile/hdaisywd-picture-1688838721986.png',
      lastLoginDate: '2023-10-05T19:18:52',
    },
    {
      bojHandle: 'angrypig7',
      notionId: 'Kihun Song',
      emoji: '🐴',
      profileImg:
        'https://static.solved.ac/uploads/profile/angrypig7-picture-1693720421238.png',
      lastLoginDate: '2023-10-05T11:18:52',
    },
    {
      bojHandle: 'wlgh1553',
      notionId: '이지호',
      emoji: '🐸',
      profileImg:
        'https://static.solved.ac/uploads/profile/wlgh1553-picture-1693238818895.png',
      lastLoginDate: '2023-10-08T19:33:52',
    },
    {
      bojHandle: 'choidg33',
      notionId: '최다경',
      emoji: '🍎',
      profileImg: 'null',
      lastLoginDate: '2023-10-08T12:13:52',
    },
    {
      bojHandle: 'phd0801',
      notionId: '박성근',
      emoji: '？',
      profileImg:
        'https://static.solved.ac/uploads/profile/phd0801-picture-1684033267569.png',
      lastLoginDate: '2023-10-03T19:13:52',
    },
    {
      bojHandle: 'testUser',
      notionId: 'testUser',
      emoji: '😊',
      profileImg: '',
      lastLoginDate: '2023-10-01T19:15:52',
    },
    {
      bojHandle: 'testUser3',
      notionId: 'testUser3',
      emoji: '😂',
      profileImg: '',
      lastLoginDate: '2023-10-05T15:15:52',
    },
    {
      bojHandle: 'enough',
      notionId: 'cool',
      emoji: '👌',
      profileImg: '',
      lastLoginDate: '2023-10-01T11:18:51',
    },
    {
      bojHandle: "that'sOK",
      notionId: "WowThat'sCool",
      emoji: '🆒',
      profileImg: '',
      lastLoginDate: '2023-10-03T13:12:52',
    },
    {
      bojHandle: 'before',
      notionId: 'before',
      emoji: '🎶',
      profileImg: '',
      lastLoginDate: '2023-10-02T11:15:52',
    },
    {
      bojHandle: 'melonboy',
      notionId: 'Minboy',
      emoji: '🐧',
      profileImg:
        'https://static.solved.ac/uploads/profile/melonboy-picture-1668514629916.png',
      lastLoginDate: '2023-10-05T19:15:55',
    },
    {
      bojHandle: 'seyeon0207',
      notionId: 'Seyeon Yang',
      emoji: '🐇',
      profileImg:
        'https://static.solved.ac/uploads/profile/seyeon0207-picture-1693277390147.png',
      lastLoginDate: '2023-10-08T15:11:51',
    },
    {
      bojHandle: 'seoheo',
      notionId: 'SY Heo',
      emoji: '🚀',
      profileImg:
        'https://static.solved.ac/uploads/profile/seoheo-picture-1679724776174.png',
      lastLoginDate: '2023-10-03T19:15:52',
    },
    {
      bojHandle: 'eogns47',
      notionId: 'KangManJoo',
      emoji: '🐱',
      profileImg:
        'https://static.solved.ac/uploads/profile/eogns47-picture-1673158646823.png',
      lastLoginDate: '2023-10-08T20:11:52',
    },
    {
      bojHandle: 'seyjang',
      notionId: 'sayyoung',
      emoji: '🍀',
      profileImg: 'null',
      lastLoginDate: '2023-09-29T19:18:52',
    },
    {
      bojHandle: 'hyeonjinan096',
      notionId: 'hyeon200',
      emoji: '🍡',
      profileImg:
        'https://static.solved.ac/uploads/profile/hyeonjinan096-picture-1681571796304.png',
      lastLoginDate: '2023-10-01T19:08:52',
    },
    {
      bojHandle: 'jake0104',
      notionId: '재현 주',
      emoji: '🍷',
      profileImg: 'null',
      lastLoginDate: '2023-09-22T12:18:52',
    },
    {
      bojHandle: 'emforhs0315',
      notionId: '성훈 조',
      emoji: '👍',
      profileImg:
        'https://static.solved.ac/uploads/profile/emforhs0315-picture-1694405066664.png',
      lastLoginDate: '2023-10-08T20:18:53',
    },
  ];

  const [sortedUsers, setSortedusers] = useState(
    [...users].sort((a, b) => {
      const dateA = a.lastLoginDate
        ? new Date(a.lastLoginDate)
        : new Date('1999-01-01T00:00:00');
      const dateB = b.lastLoginDate
        ? new Date(b.lastLoginDate)
        : new Date('1999-01-01T00:00:00');
      return dateB - dateA;
    }),
  );

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

  return (
    <Card>
      <Title>마지막 로그인 일시</Title>
      <Content>
        <UserWrapper ref={horizontalScrollRef}>
          {sortedUsers.map((user) => (
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
              <LastLoginDate>
                {dayjs(user.lastLoginDate).format('YYYY/MM/DD\nHH:mm:ss')}
              </LastLoginDate>
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
            console.log(sortedUsers);
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

export default LastLogin;
