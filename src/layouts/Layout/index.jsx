import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FlexWrapper,
  HeaderWrapper,
  ProfileImage,
  Content,
  Menu,
  MobileMenuItem,
  MobileMenu,
  MenuItem,
  MenuWrapper,
  SideMyInfo,
  MobileMenuWrapper,
  MobileMenuIcon,
  EventHeader,
  CloseButton,
  Container,
  MobileHamburgerMenu,
  HeaderLogoImg,
  LoginButton,
  MobileLoginButton,
  MyPageMenu,
  CreateModal,
} from './style';
import Modal from 'layouts/Modal';
import ProblemRecommend from 'pages/ProblemRecommend';
import Store from 'pages/Store';
import { FiLogOut } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
import { userLogout } from 'api/user';
import { getHeaderRefreshTokenConfig, logoutProc } from 'utils/auth';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { EVT_PREFIX_URL, USER_PREFIX_URL } from 'utils/constants';
import { IoArrowBackOutline } from 'react-icons/io5';
import { isLoginUser } from 'utils/auth';
import { MdPerson } from 'react-icons/md';

function Layout({ children }) {
  const isLogin = useMemo(() => {
    return isLoginUser();
  }, []);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const { data: loginUser } = useSWR(
    isLogin ? `${USER_PREFIX_URL}/auth/parse/boj` : '',
    fetcher,
  );

  const { data: pointEvent } = useSWR(
    isLogin ? `${EVT_PREFIX_URL}/point/all/valid` : '',
    fetcher,
  );

  const currentTab = useLocation().pathname.slice(1).split('/')[0];
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [showMyPageMenu, setShowMyPageMenu] = useState(false);

  // 좌측 탭 목록
  const [tabs, setTabs] = useState({
    users: {
      id: 1,
      name: '스터디원',
      icon: '👩🏻‍💻',
      route: '/users',
    },
    teams: {
      id: 2,
      name: '팀',
      icon: '⚔️',
      route: '/teams',
    },
    statistics: {
      id: 3,
      name: '통계',
      icon: '📊',
      route: '/statistics',
    },
    ranking: {
      id: 4,
      name: '랭킹',
      icon: '🏅',
      route: '/ranking',
    },
    board: {
      id: 5,
      name: '게시판',
      icon: '📝',
      route: '/board',
    },
    roadmap: {
      id: 6,
      name: '로드맵',
      icon: '🗺️',
      route: '/roadmap',
    },
    store: {
      id: 7,
      name: '상점',
      icon: '🏠',
      route: '/store',
    },
  });

  useEffect(() => {
    if (!loginUser) return;
    // 관리자일 경우 관리자 탭 추가
    if (loginUser.manager) {
      setTabs((prev) => ({
        ...prev,
        admin: {
          id: 8,
          name: '관리자',
          icon: '⚙️',
          route: '/admin',
        },
      }));
    }
  }, [loginUser]);

  const onClickLogout = useCallback(() => {
    if (!loginUser) return;
    const params = { bojHandle: loginUser.claim };
    const config = getHeaderRefreshTokenConfig();
    userLogout(params, config)
      .then(() => {
        // 로그아웃 처리
        logoutProc();
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, [loginUser]);

  const { data: userInfo } = useSWR(
    loginUser ? `${USER_PREFIX_URL}/info?bojHandle=${loginUser.claim}` : null,
    fetcher,
  );

  const onCloseModal = useCallback(() => {
    setShowStoreModal(false);
    setShowRecommendModal(false);
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowMobileMenu(false);
    navigate(`/my-page/${loginUser.claim}`);
  }, [loginUser]);

  const [showEventHeader, setShowEventHeader] = useState(true);

  if (showMobileMenu) {
    return (
      <>
        <MobileHamburgerMenu>
          <IoArrowBackOutline
            style={{ cursor: 'pointer', marginLeft: '10px' }}
            onClick={() => {
              setShowMobileMenu((prev) => !prev);
            }}
            size="21"
          />
        </MobileHamburgerMenu>
        <MobileMenuWrapper>
          <div>
            {isLogin ? (
              <SideMyInfo onClick={onClickUserProfile}>
                <ProfileImage
                  width="45"
                  height="45"
                  src={
                    !userInfo || userInfo.profileImg == 'null'
                      ? 'https://static.solved.ac/misc/360x360/default_profile.png'
                      : userInfo.profileImg
                  }
                />
                {userInfo.notionId} {userInfo.emoji}
              </SideMyInfo>
            ) : (
              <MobileLoginButton
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인
              </MobileLoginButton>
            )}
            <MobileMenu>
              <div>
                {Object.keys(tabs).map((key) => (
                  <MobileMenuItem
                    className={currentTab === key ? 'selected' : ''}
                    key={tabs[key].id}
                    onClick={() => {
                      navigate(tabs[key].route);
                      setShowMobileMenu(false);
                    }}
                  >
                    {tabs[key].icon}
                    <div>{tabs[key].name}</div>
                  </MobileMenuItem>
                ))}
              </div>
              <MobileMenuItem onClick={onClickLogout}>
                <FiLogOut /> <div>로그아웃</div>
              </MobileMenuItem>
            </MobileMenu>
          </div>
        </MobileMenuWrapper>
      </>
    );
  }

  return (
    <Container>
      <Content>
        {/* 헤더 */}
        <HeaderWrapper>
          <FlexWrapper>
            <MobileMenuIcon>
              <RxHamburgerMenu
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => {
                  setShowMobileMenu((prev) => !prev);
                }}
              />
            </MobileMenuIcon>
            <Link to="/home">
              <HeaderLogoImg
                src={process.env.PUBLIC_URL + '/header_logo.svg'}
              />
            </Link>
            <MenuWrapper>
              <Menu>
                {Object.keys(tabs).map((key) => (
                  <MenuItem
                    className={currentTab === key ? 'selected' : ''}
                    key={tabs[key].id}
                    onClick={() => {
                      navigate(tabs[key].route);
                    }}
                  >
                    <div>{tabs[key].name}</div>
                  </MenuItem>
                ))}
              </Menu>
            </MenuWrapper>
          </FlexWrapper>
          {isLogin ? (
            <SideMyInfo>
              <ProfileImage
                width="35"
                height="35"
                src={
                  !userInfo || userInfo.profileImg == 'null'
                    ? 'https://static.solved.ac/misc/360x360/default_profile.png'
                    : userInfo.profileImg
                }
                onClick={() => {
                  setShowMyPageMenu((prev) => !prev);
                }}
              />
              {showMyPageMenu && (
                <CreateModal
                  onClick={() => {
                    setShowMyPageMenu(false);
                  }}
                >
                  <MyPageMenu>
                    <div
                      onClick={() => {
                        onClickUserProfile();
                        setShowMyPageMenu(false);
                      }}
                    >
                      <MdPerson />내 프로필
                    </div>
                    <div
                      onClick={() => {
                        onClickLogout();
                        setShowMyPageMenu(false);
                      }}
                    >
                      <FiLogOut /> 로그아웃
                    </div>
                  </MyPageMenu>
                </CreateModal>
              )}
            </SideMyInfo>
          ) : (
            <LoginButton
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </LoginButton>
          )}
          {}
        </HeaderWrapper>
        {/* 이벤트 헤더 */}
        {showEventHeader && pointEvent && !isEmpty(pointEvent) && (
          <EventHeader length={pointEvent.length}>
            <div>
              {pointEvent.map((event) => (
                <span key={event.id}>
                  <b>
                    [{event.eventName}] {event.description}
                  </b>{' '}
                  이벤트가 진행중입니다. (
                  {dayjs(event.startTime).format('M/D HH:mm')} ~{' '}
                  {dayjs(event.endTime).format('M/D HH:mm')}) &nbsp; &nbsp;
                  &nbsp;
                </span>
              ))}
            </div>
            <CloseButton
              onClick={() => {
                setShowEventHeader(false);
              }}
            >
              &times;
            </CloseButton>
          </EventHeader>
        )}
        <section>{children}</section>
      </Content>
      <Modal show={showRecommendModal} onCloseModal={onCloseModal}>
        <ProblemRecommend />
      </Modal>
      <Modal show={showStoreModal} onCloseModal={onCloseModal}>
        <Store />
      </Modal>
    </Container>
  );
}

export default React.memo(Layout);
