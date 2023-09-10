import React from 'react';
import { getAllUsers } from 'api/user';
import useFetch from 'hooks/useFetch';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import {
  Title,
  Card,
  ProfileImage,
  ProfileWrapper,
  Warning,
  WarningMsg,
  WarningWrapper,
  IconWrapper,
  UserInfoWrapper,
  CardWrapper,
} from './style';

function WarningManage() {
  const [users] = useFetch(getAllUsers, []);
  const [sortedUsers, setSortedUsers] = useState([]);
  return (
    <div>
      <Title>경고 부여/차감</Title>
      <div align="left">
        {users &&
          users.map((user) => {
            return (
              <div>
                {user.notionId} : 경고={user.warning}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default WarningManage;
