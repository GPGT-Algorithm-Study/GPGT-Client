import React from 'react';
import { Card, Content, User, UserWrapper, Title } from './style';
import SolvedIcon from 'components/SolvedIcon';
import useSWR from 'swr';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import WarningIcon from 'components/WarningIcon';
/**
 * 사용자별 경고 현황 그래프
 */
function WarningGraph() {
  const { data: users } = useSWR(`${USER_PREFIX_URL}/info/all`, fetcher);

  if (!users) return null;

  return (
    <Card>
      <Title>경고 현황</Title>
      <Content>
        <UserWrapper>
          {users.map((user) => (
            <User key={user.notionId}>
              <WarningIcon warning={user.warning} />
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

export default WarningGraph;
