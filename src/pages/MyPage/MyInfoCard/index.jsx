import React from 'react';
import {
  Card,
  ProfileWrapper,
  UserId,
  Warning,
  WarningWrapper,
  UserInfo,
  RandomStreakInfo,
  MaxStreak,
} from './style';
import { CommonProfileImage, CommonTierImg } from 'commonStyle';
import SolvedIcon from 'components/SolvedIcon';
import Streak from 'components/Streak';

function MyInfoCard() {
  const MAX_STREAK = 365;
  const randomStreak = [];
  return (
    <Card>
      <ProfileWrapper>
        <UserInfo>
          <CommonProfileImage
            width="80"
            height="80"
            src="https://static.solved.ac/misc/360x360/default_profile.png"
          />
          <UserId>
            <div className="user-id">klloo 🏖️</div>
            <div className="boj-handle">asdf016182</div>
            <WarningWrapper>
              {[...Array(3)].map((_, i) => (
                <Warning key={i} warning={i + 1 <= 1} />
              ))}
            </WarningWrapper>
          </UserId>
          <CommonTierImg
            src={`https://static.solved.ac/tier_small/17.svg`}
            width="40"
            height="40"
          />
        </UserInfo>
        <SolvedIcon solved={true} />
      </ProfileWrapper>
      <RandomStreakInfo>
        <div>
          Random Streak <span>0</span> days
        </div>
        <Streak
          randomStreak={randomStreak}
          maxStreak={MAX_STREAK}
          line={4}
          width={1840}
          height={90}
        />
        <MaxStreak>
          최장<span> 1</span>일
        </MaxStreak>
      </RandomStreakInfo>
    </Card>
  );
}

export default MyInfoCard;
