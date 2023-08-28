import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import GlobalStyle from 'style/globalStyle';
import Main from './pages/Main';
import Login from 'pages/Login';
import MyPage from 'pages/MyPage';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import { getRefreshTokenToCookie, onSilentRefresh } from 'utils/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Admin from 'pages/Admin';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    onSilentRefresh(dispatch);
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
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/" element={<Main />} />
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
