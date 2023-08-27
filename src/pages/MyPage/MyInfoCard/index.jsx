import React, { useCallback } from 'react';
import Cookies from 'universal-cookie';
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
import { WarningMsg, ProfileImage } from 'pages/Main/Users/UserCard/style';
import { userLogout } from 'api/user';
import { logoutProc } from 'utils/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 * 마이페이지 내 정보 카드
 */
function MyInfoCard({ userInfo }) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = useCallback(() => {
    const token = cookies.get('refresh_token');
    const config = {
      headers: {
        Refresh_Token: `${token}`,
      },
    };
    const params = { bojHandle: userInfo.bojHandle };
    userLogout(params, config)
      .then((response) => {
        // 로그아웃 처리 후 로그인 페이지로 이동
        logoutProc(dispatch);
        navigate('/login');
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, []);

  return (
    <Card>
      <ButtonWrapper>
        <Button>비밀번호 변경</Button>
        <Button marginLeft="12px" onClick={onClickLogout}>
          로그아웃
        </Button>
      </ButtonWrapper>
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
    </Card>
  );
}

export default MyInfoCard;
