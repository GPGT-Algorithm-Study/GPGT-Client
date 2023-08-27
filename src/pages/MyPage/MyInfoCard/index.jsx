import React from 'react';
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

/**
 * 마이페이지 내 정보 카드
 */
function MyInfoCard({ userInfo }) {
  return (
    <Card>
      <ButtonWrapper>
        <Button>비밀번호 변경</Button>
        <Button marginLeft="12px">로그아웃</Button>
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
