import React, { useCallback, useState } from 'react';
import {
  Card,
  ProfileWrapper,
  UserId,
  Warning,
  WarningWrapper,
  ButtonWrapper,
  UserInfo,
  Button,
  UpdateButton,
} from './style';
import { CommonTierImg } from 'style/commonStyle';
import {
  WarningMsg,
  ProfileImage,
  RandomStreakInfo,
  MaxStreak,
} from 'pages/Users/UserCard/style';
import { userLogout } from 'api/user';
import { getHeaderRefreshTokenConfig, logoutProc } from 'utils/auth';
import PasswordChangeModal from './PasswordChangeModal';
import { HiOutlineRefresh } from 'react-icons/hi';
import { scrapUserInfo } from 'api/scraping';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import Streak from 'components/Streak';
import { Tooltip } from 'react-tooltip';

/**
 * 마이페이지 내 정보 카드
 */
function MyInfoCard({ userInfo, isUser }) {
  // 유저의 스트릭 잔디 정보
  const { data: randomStreak } = useSWR(
    `${USER_PREFIX_URL}/streak/grass?bojHandle=${userInfo.bojHandle}`,
    fetcher,
  );

  const [showPwChangeModal, setShowPwChangeModal] = useState(false);

  const onClickLogout = useCallback(() => {
    const params = { bojHandle: userInfo.bojHandle };
    const config = getHeaderRefreshTokenConfig();
    userLogout(params, config)
      .then(() => {
        // 로그아웃 처리
        logoutProc();
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, [userInfo]);

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

  return (
    <Card>
      {isUser && (
        <ButtonWrapper>
          <Button
            onClick={() => {
              setShowPwChangeModal(true);
            }}
          >
            비밀번호 변경
          </Button>
          <Button marginLeft="12px" onClick={onClickLogout}>
            로그아웃
          </Button>
        </ButtonWrapper>
      )}
      <ProfileWrapper>
        <UserInfo>
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
          <CommonTierImg
            src={`https://static.solved.ac/tier_small/${userInfo.tier}.svg`}
            width="40"
            height="40"
          />
        </UserInfo>
      </ProfileWrapper>
      {isUser && (
        <>
          <UpdateButton
            onClick={refreshUserInfo}
            data-tooltip-id="info-tooltip"
          >
            <HiOutlineRefresh
              size="21"
              className={refreshing ? 'loading' : ''}
            />
          </UpdateButton>
          <Tooltip
            id="info-tooltip"
            place="top"
            content={
              <div style={{ lineHeight: '1.5' }}>
                20분에 한 번만 업데이트 할 수 있습니다.
              </div>
            }
          />
        </>
      )}
      <RandomStreakInfo>
        <div>
          Random Streak <span>{userInfo.currentRandomStreak}</span> days
        </div>
        {randomStreak && (
          <Streak
            randomStreak={randomStreak}
            maxStreak={365}
            line={5}
            width={1470}
            height={110}
          />
        )}
        <MaxStreak>
          최장<span> {userInfo.maxRandomStreak}</span>일
        </MaxStreak>
      </RandomStreakInfo>
      <PasswordChangeModal
        showModal={showPwChangeModal}
        closeModal={() => {
          setShowPwChangeModal(false);
        }}
      />
    </Card>
  );
}

export default MyInfoCard;
