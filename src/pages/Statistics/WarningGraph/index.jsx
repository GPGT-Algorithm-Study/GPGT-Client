import React, { useEffect, useState } from 'react';
import { Card, Content, User, UserWrapper, Title } from './style';
import useSWR from 'swr';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import WarningIcon from 'components/WarningIcon';
import Skeleton from 'react-loading-skeleton';
/**
 * 사용자별 경고 현황 그래프
 */
function WarningGraph() {
  const { data: users } = useSWR(`${USER_PREFIX_URL}/info/all`, fetcher);
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    if (!users) return;
    setSortedUsers(
      users.sort((a, b) => {
        if (a.warning === 4) return 1;
        if (b.warning === 4) return -1;
        return b.warning - a.warning;
      }),
    );
  }, [users]);

  return (
    <Card>
      <Title>경고 현황</Title>
      <Content>
        <UserWrapper>
          {users
            ? sortedUsers.map((user) => (
                <User key={user.notionId}>
                  <WarningIcon warning={user.warning} />
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

export default WarningGraph;
