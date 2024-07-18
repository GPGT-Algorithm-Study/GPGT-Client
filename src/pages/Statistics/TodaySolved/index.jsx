import React from 'react';
import { Card, Content, User, UserWrapper, Title } from './style';
import SolvedIcon from 'components/SolvedIcon';
import useSWR from 'swr';
import { STAT_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import Skeleton from 'react-loading-skeleton';

function TodaySolved() {
  const { data: users } = useSWR(
    `${STAT_PREFIX_URL}/graph/is-today-solved`,
    fetcher,
  );

  return (
    <Card>
      <Title>오늘의 문제 해결 현황</Title>
      <Content>
        <UserWrapper>
          {users
            ? users.map((user) => (
                <User key={user.notionId}>
                  <SolvedIcon solved={user.isTodaySolved} />
                  <div>
                    {user.notionId} {user.emoji}
                  </div>
                </User>
              ))
            : new Array(12).fill(0).map((_, i) => (
                <User key={i}>
                  <Skeleton width={40} height={40} circle />
                  <Skeleton width={70} />
                </User>
              ))}
        </UserWrapper>
      </Content>
    </Card>
  );
}

export default TodaySolved;
