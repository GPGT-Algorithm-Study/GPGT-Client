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
} from './style';
import { CommonTierImg } from 'style/commonStyle';
import { WarningMsg, ProfileImage } from 'pages/Users/UserCard/style';
import { userLogout } from 'api/user';
import { getHeaderRefreshTokenConfig, logoutProc } from 'utils/auth';
import PasswordChangeModal from './PasswordChangeModal';

/**
 * 마이페이지 내 정보 카드
 */
function MyInfoCard({ userInfo, isUser }) {
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
  }, []);

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
