import React, { useEffect } from 'react';
import GlobalStyle from 'style/globalStyle';
import Main from './pages/Main';
import Login from 'pages/Login';
import MyPage from 'pages/MyPage';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import { onSilentRefresh } from 'utils/auth';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onSilentRefresh(dispatch);
  }, []);

  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
          <Route element={<PrivateRoute authentication={false} />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
          <Route element={<PrivateRoute authentication={true} />}>
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/" element={<Main />} />
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
