import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { getRefreshTokenToCookie } from 'utils/auth';
import Layout from './Layout';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { USER_PREFIX_URL } from 'utils/constants';

export default function PrivateRoute({
  userAuthentication,
  adminAuthentication,
}) {
  const token = getRefreshTokenToCookie();
  const isLogin = !isEmpty(token);
  const { data: loginUser } = useSWR(
    isLogin ? `${USER_PREFIX_URL}/auth/parse/boj` : null,
    fetcher,
  );

  if (userAuthentication) {
    // 사용자 인증이 반드시 필요한 페이지
    // 관리자 인증이 반드시 필요한 페이지
    if (adminAuthentication) {
      // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
      if (!isLogin) return <Navigate to="/login" />;
      // 관리자가 아닐 경우 메인 페이지로, 했을 경우 해당 페이지로
      return !loginUser.manager ? (
        <Navigate to="/home" />
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      );
    }
    // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
    return !isLogin ? (
      <Navigate to="/login" />
    ) : (
      <Layout>
        <Outlet />
      </Layout>
    );
  } else {
    // 인증이 반드시 필요 없는 페이지
    // 인증을 안했을 경우 해당 페이지로, 인증을 한 상태일 경우 main페이지로
    return !isLogin ? <Outlet /> : <Navigate to="/home" />;
  }
}
