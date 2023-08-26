import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

export default function PrivateRoute({ authentication }) {
  const user = useSelector((state) => state.user);
  const isLogin = !isEmpty(user) && !isEmpty(user?.bojHandle);

  if (authentication) {
    // 인증이 반드시 필요한 페이지
    // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
    return !isLogin ? <Navigate to="/login" /> : <Outlet />;
  } else {
    // 인증이 반드시 필요 없는 페이지
    // 인증을 안했을 경우 해당 페이지로, 인증을 한 상태일 경우 main페이지로
    return !isLogin ? <Outlet /> : <Navigate to="/" />;
  }
}
