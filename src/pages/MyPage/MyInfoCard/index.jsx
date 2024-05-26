import React, { useCallback, useState } from 'react';
import {
  Card,
  ProfileWrapper,
  UserId,
  Warning,
  WarningWrapper,
  ButtonWrapper,
  UserInfo,
  SettingMenu,
  ToggleButton,
  TierSpan,
} from './style';
import { WarningMsg, ProfileImage } from 'pages/Users/UserCard/style';
import PasswordChangeModal from './PasswordChangeModal';
import { HiOutlineRefresh } from 'react-icons/hi';
import { scrapUserInfo } from 'api/scraping';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { IoMdSettings } from 'react-icons/io';
import { getTierColor, numToTierStrKo } from 'utils/tier';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import ProblemCard from 'pages/Users/ProblemCard';
import RandomProblemCard from 'pages/Users/RandomProblemCard';
import SettingRandomPopup from './SettingRandomPopup';
import OverlayMenu from 'components/OverlayMenu';

/**
 * 마이페이지 내 정보 카드
 */
function MyInfoCard({ userInfo, isUser, loadData }) {
  // 유저의 스트릭 잔디 정보

  const [showPwChangeModal, setShowPwChangeModal] = useState(false);
  const [showSettinMenu, setShowSettingMenu] = useState(false);
  const [showProblems, setShowProblems] = useState(false);
  const [showRandomSetting, setShowRandomSetting] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const refreshUserInfo = useCallback(() => {
    if (refreshing) return;
    setRefreshing(true);
    scrapUserInfo(userInfo.bojHandle)
      .then((res) => {
        if (res.status === 200) {
          toast.success('사용자 정보가 업데이트 되었습니다.');
        }
      })
      .catch((e) => {
        if (e.response.status === 425) {
          toast.error(e.response.data.message);
        }
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [userInfo]);

  const changePoint = useCallback(() => {
    if (!isUser) return;
    loadData();
  }, [isUser, loadData]);

  return (
    <>
      <Card>
        {isUser && (
          <>
            <ButtonWrapper>
              <IoMdSettings
                size="18"
                onClick={() => {
                  setShowSettingMenu((prev) => !prev);
                }}
              />
            </ButtonWrapper>
            {showSettinMenu && (
              <OverlayMenu
                onClose={() => {
                  setShowSettingMenu(false);
                }}
              >
                <SettingMenu>
                  <div
                    onClick={() => {
                      setShowPwChangeModal(true);
                      setShowSettingMenu(false);
                    }}
                  >
                    비밀번호 변경
                  </div>
                  <div
                    onClick={() => {
                      setShowRandomSetting(true);
                      setShowSettingMenu(false);
                    }}
                  >
                    랜덤 문제 추천 설정
                  </div>
                  <div data-tooltip-id="info-tooltip" onClick={refreshUserInfo}>
                    정보 업데이트
                    <HiOutlineRefresh
                      size="12"
                      className={refreshing ? 'loading' : ''}
                    />
                  </div>
                  <Tooltip
                    id="info-tooltip"
                    place="top"
                    content={
                      <div style={{ lineHeight: '1.5' }}>
                        20분에 한 번만 업데이트 할 수 있습니다.
                      </div>
                    }
                  />
                </SettingMenu>
              </OverlayMenu>
            )}
          </>
        )}
        <ProfileWrapper>
          <ProfileImage
            width={80}
            height={80}
            src={
              userInfo.profileImg != 'null'
                ? userInfo.profileImg
                : 'https://static.solved.ac/misc/360x360/default_profile.png'
            }
            isWarning={userInfo.warning == 4}
          />
          <UserId>
            <div className="user-id">
              {userInfo.notionId} {userInfo.emoji}
            </div>
            <div className="boj-handle">{userInfo.bojHandle}</div>
            {userInfo.warning == 4 && <WarningMsg>BLOCKED</WarningMsg>}
            {userInfo.warning < 4 && (
              <WarningWrapper>
                {[...Array(3)].map((_, i) => (
                  <Warning key={i} warning={i + 1 <= userInfo.warning} />
                ))}
              </WarningWrapper>
            )}
          </UserId>
        </ProfileWrapper>
        <UserInfo>
          <div>
            solved.ac 티어
            <TierSpan color={getTierColor(userInfo.tier - 1)}>
              {numToTierStrKo(userInfo.tier - 1)}
            </TierSpan>
          </div>
          <div>
            푼 문제 수 <span>{userInfo.totalSolved}</span>
          </div>
          <div>
            보유 포인트 <span>{userInfo.point}</span>
          </div>
        </UserInfo>
        <ToggleButton
          onClick={() => {
            setShowProblems((prev) => !prev);
          }}
        >
          <span>{showProblems ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </ToggleButton>
        {isUser && (
          <>
            <PasswordChangeModal
              showModal={showPwChangeModal}
              closeModal={() => {
                setShowPwChangeModal(false);
              }}
            />
            <SettingRandomPopup
              showModal={showRandomSetting}
              closeModal={() => {
                setShowRandomSetting(false);
              }}
            />
          </>
        )}
      </Card>
      {showProblems && (
        <>
          <RandomProblemCard user={userInfo} changePoint={changePoint} />
          <ProblemCard user={userInfo} />
        </>
      )}
    </>
  );
}

export default MyInfoCard;
