import Layout from 'layouts/Layout';
import React from 'react';
import { setShowWarningManageModal, setShowUserManageModal } from 'redux/modal';
import { UtilWrapper, Util, UtilIcon } from 'pages/Main/style';
import { useDispatch } from 'react-redux';
import { getYesterdayUnsolvedUsers } from 'api/statistics';
import useFetch from 'hooks/useFetch';

/**
 * 오늘 날짜에서 i번째 이전 날짜를 반환한다.
 */
/*
const getPreviousDate = useCallback((i) => {
  const today = new Date();
  // 오전 6시 기준으로 오늘이 나뉨. 오전 6시 이전이라면 어제를 오늘로 친다.
  if (today.getHours() < 6) {
    today.setDate(today.getDate() - 1);
  }
  const previousDate = new Date(today);
  previousDate.setDate(today.getDate() - i);
  return previousDate;
}, []);*/

function Admin() {
  const dispatch = useDispatch();
  const utils = [
    {
      id: 1,
      name: '경고 관리',
      iconUrl: `${process.env.PUBLIC_URL}/recommend_icon.svg`,
      clickListener: () => {
        dispatch(setShowWarningManageModal(true));
      },
    },
    {
      id: 2,
      name: '유저 추가/삭제',
      iconUrl: `${process.env.PUBLIC_URL}/recommend_icon.svg`,
      clickListener: () => {
        dispatch(setShowUserManageModal(true));
      },
    },
  ];
  const [yesterdayUnsolvedUsers] = useFetch(getYesterdayUnsolvedUsers, []);

  return (
    <Layout>
      <UtilWrapper>
        {utils.map((util) => (
          <Util key={util.id} onClick={util.clickListener}>
            <UtilIcon url={util.iconUrl}></UtilIcon>
            <div>{util.name}</div>
          </Util>
        ))}
      </UtilWrapper>
      <div align="left">
        --- 어제 안 푼 사람들 ---
        {yesterdayUnsolvedUsers &&
          yesterdayUnsolvedUsers.map((user) => {
            return <div>{user.id}</div>;
          })}
      </div>
    </Layout>
  );
}

export default Admin;
