import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import GlobalStyle from 'style/globalStyle';
import Main from './pages/Main';
import Login from 'pages/Login';
import MyPage from 'pages/MyPage';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from 'layouts/PrivateRoute';
import { getRefreshTokenToCookie, onSilentRefresh } from 'utils/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Admin from 'pages/Admin';
import Users from 'pages/Users';
import Teams from 'pages/Teams';
import Statistics from 'pages/Statistics';
import Board from 'pages/Board';
import Write from 'pages/Board/Write';
import Detail from 'pages/Board/Detail';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    onSilentRefresh(dispatch);
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          return caches.delete(key);
        }),
      );
    });
  }, []);

  const refreshToken = getRefreshTokenToCookie();
  if (isEmpty(user.bojHandle) && !isEmpty(refreshToken)) {
    return <></>;
  }

  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
          <Route element={<PrivateRoute userAuthentication={false} />}>
            <Route path="/login" element={<Login />} />
          </Route>
          {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
          <Route element={<PrivateRoute userAuthentication={true} />}>
            <Route path="/my-page/:bojHandle" element={<MyPage />} />
            <Route path="/home" element={<Main />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/board">
              <Route index element={<Board />} />
              <Route path=":id" element={<Detail />} />
            </Route>
          </Route>

          {/* 관리자만 접속 가능한 페이지 정의 */}
          <Route
            element={
              <PrivateRoute
                userAuthentication={true}
                adminAuthentication={true}
              />
            }
          >
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* 이 경로가 없을 때 "/home"로 리다이렉트된다 */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </div>
  );
}

export default App;
