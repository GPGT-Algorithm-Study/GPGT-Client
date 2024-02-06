import React from 'react';
import {
  Card,
  UserInfo,
  SolvedInfo,
  Warning,
  StreakSolved,
  RandomStreakInfo,
  Line,
  WarningWrapper,
  ToggleButton,
  ProfileWrapper,
  FlexWrapper,
  TierWrapper,
  CenterConatiner,
} from './style';
import { FaChevronDown } from 'react-icons/fa';
import SolvedIcon from 'components/SolvedIcon';
import Skeleton from 'react-loading-skeleton';

/**
 * 사용자 정보 카드 컴포넌트
 */
function SkeletonUserCard() {
  return (
    <Card>
      {/* 상단 유저 아이디, 포인트, 프로필 이미지 */}
      <UserInfo>
        <ProfileWrapper>
          <div>
            <Skeleton circle height={70} width={70} />
          </div>
          <div className="id-wrapper">
            <Skeleton width={100} height={20} />
            <Skeleton width={150} height={15} />
          </div>
        </ProfileWrapper>
      </UserInfo>

      {/* 가운데 경고, 티어, 스트릭, 푼 문제 수 정보 */}
      <SolvedInfo>
        <FlexWrapper>
          <CenterConatiner>
            <WarningWrapper>
              {[...Array(3)].map((_, i) => (
                <Warning key={i} warning={false} />
              ))}
            </WarningWrapper>
          </CenterConatiner>
          <TierWrapper>
            <Skeleton width={40} height={40} />
            <StreakSolved>
              <Skeleton width={100} height={15} />
              <Skeleton width={100} height={15} />
            </StreakSolved>
          </TierWrapper>
        </FlexWrapper>
        <SolvedIcon solved={false} />
      </SolvedInfo>
      <Line />
      {/* 맨 밑에 랜덤 스트릭 정보 */}
      <RandomStreakInfo>
        <Skeleton width={'100%'} height={80} />
      </RandomStreakInfo>
      <ToggleButton>
        <span>
          <FaChevronDown />
        </span>
      </ToggleButton>
    </Card>
  );
}

export default SkeletonUserCard;
