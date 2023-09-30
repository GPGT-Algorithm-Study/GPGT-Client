import React, { useCallback, useEffect, useState } from 'react';
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
} from './style';
import Modal from 'layouts/Modal';
import ProblemRecommend from 'pages/ProblemRecommend';
import Store from 'pages/Store';
import useFetch from 'hooks/useFetch';
import { getUserInfo } from 'api/user';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowRecommendModal,
  setShowStoreModal,
  setShowWarningManageModal,
  setShowPointManageModal,
} from 'redux/modal';
import { toast } from 'react-toastify';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { HiUsers } from 'react-icons/hi';
import { BsBarChartFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { LuSwords } from 'react-icons/lu';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaClipboardList } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { userLogout } from 'api/user';
import { getHeaderRefreshTokenConfing, logoutProc } from 'utils/auth';
import { getValidPointEvents } from 'api/event';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

function Layout({ children }) {
  const dispatch = useDispatch();
  const { showStoreModal, showRecommendModal } = useSelector(
    (state) => state.modal,
  );
  const user = useSelector((state) => state.user);
  const currentTab = useLocation().pathname.slice(1).split('/')[0];
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAdmin } = useSelector((state) => state.user);
  const [pointEvent] = useFetch(getValidPointEvents);

  // 좌측 탭 목록
  const [tabs, setTabs] = useState({
    home: { id: 0, name: '홈', icon: <AiFillHome size="18" />, route: '/home' },
    users: {
      id: 1,
      name: '스터디원',
      icon: <HiUsers size="18" />,
      route: '/users',
    },
    teams: {
      id: 2,
      name: '팀',
      icon: <LuSwords size="18" />,
      route: '/teams',
    },
    statistics: {
      id: 3,
      name: '통계',
      icon: <BsBarChartFill size="18" />,
      route: '/statistics',
    },
    board: {
      id: 4,
      name: '게시판',
      icon: <FaClipboardList size="18" />,
      route: '/board',
    },
  });

  useEffect(() => {
    // 관리자일 경우 관리자 탭 추가
    if (isAdmin) {
      setTabs((prev) => ({
        ...prev,
        admin: {
          id: 5,
          name: '관리자',
          icon: <AiFillSetting size="18" />,
          route: '/admin',
        },
      }));
    }
  }, [isAdmin]);

  const onClickLogout = useCallback(() => {
    const params = { bojHandle: user.bojHandle };
    const config = getHeaderRefreshTokenConfing();
    userLogout(params, config)
      .then((response) => {
        // 로그아웃 처리
        logoutProc(dispatch);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, []);

  const [userInfo] = useFetch(getUserInfo, {}, { bojHandle: user.bojHandle });

  const onClickStore = useCallback(() => {
    if (userInfo.warning == 4) {
      toast.error('상점을 이용하실 수 없습니다.');
      return;
    }
    dispatch(setShowStoreModal(true));
  }, [userInfo]);

  const onCloseModal = useCallback(() => {
    dispatch(setShowStoreModal(false));
    dispatch(setShowRecommendModal(false));
    dispatch(setShowWarningManageModal(false));
    dispatch(setShowPointManageModal(false));
  }, []);

  const onClickUserProfile = useCallback(() => {
    window.location.href = `/my-page/${user.bojHandle}`;
  }, [user]);

  const [showEventHeader, setShowEventHeader] = useState(true);

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
              <img src={process.env.PUBLIC_URL + '/header_logo.svg'} />
            </Link>
          </FlexWrapper>
          <FlexWrapper>
            <div
              className="clickable"
              onClick={() => {
                dispatch(setShowRecommendModal(true));
              }}
            >
              문제추천
            </div>
            <div className="clickable" onClick={onClickStore}>
              상점
            </div>
            <SideMyInfo onClick={onClickUserProfile}>
              <ProfileImage
                width="35"
                height="35"
                src={
                  userInfo.profileImg == 'null'
                    ? 'https://static.solved.ac/misc/360x360/default_profile.png'
                    : userInfo.profileImg
                }
              />
            </SideMyInfo>
          </FlexWrapper>
        </HeaderWrapper>
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
                <div>{tabs[key].icon}</div>
              </MenuItem>
            ))}
          </Menu>
        </MenuWrapper>
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
        {/* 모바일 화면 메뉴 */}
        {showMobileMenu && (
          <MobileMenuWrapper>
            <div>
              <SideMyInfo onClick={onClickUserProfile}>
                <ProfileImage
                  width="45"
                  height="45"
                  src={
                    userInfo.profileImg == 'null'
                      ? 'https://static.solved.ac/misc/360x360/default_profile.png'
                      : userInfo.profileImg
                  }
                />
                {userInfo.notionId} {userInfo.emoji}
              </SideMyInfo>
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
