import React from 'react';
import { Card, Content, User, UserWrapper, Title } from './style';
import SolvedIcon from 'components/SolvedIcon';
import useSWR from 'swr';
import { STAT_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';

function TodaySolved() {
  const { data: users } = useSWR(
    `${STAT_PREFIX_URL}/graph/is-today-solved`,
    fetcher,
  );

  if (!users) {
    return null;
  }

  return (
    <Card>
      <Title>오늘의 문제 해결 현황</Title>
      <Content>
        <UserWrapper>
          {users.map((user) => (
            <User key={user.notionId}>
              <SolvedIcon solved={user.isTodaySolved} />
              <div>
                {user.notionId} {user.emoji}
              </div>
            </User>
          ))}
        </UserWrapper>
      </Content>
    </Card>
  );
}

export default TodaySolved;
