import React, { useEffect, useState } from 'react';
import GlobalStyle from 'style/globalStyle';
import Main from './pages/Main';
import MyPage from 'pages/MyPage';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from 'layouts/PrivateRoute';
import { getRefreshTokenToCookie, onSilentRefresh } from 'utils/auth';
import Admin from 'pages/Admin';
import Users from 'pages/Users';
import Teams from 'pages/Teams';
import Statistics from 'pages/Statistics';
import Board from 'pages/Board';
import Detail from 'pages/Board/Detail';
import Roadmap from 'pages/Roadmap';
import Ranking from 'pages/Ranking';
import CreateRoadmapProblem from 'pages/Roadmap/CreateRoadmapProblem';
import RoadmapDetail from 'pages/Roadmap/RoadmapDetail';
import Layout from 'layouts/Layout';
import Login from 'pages/Login';
import Store from 'pages/Store';

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    onSilentRefresh(setToken);
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          return caches.delete(key);
        }),
      );
    });
    return () => {
      localStorage.removeItem('boardParams');
    };
  }, []);

  const refreshToken = getRefreshTokenToCookie();

  if (!token && refreshToken) {
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
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/store" element={<Store />} />
            <Route path="/roadmap">
              <Route index element={<Roadmap />} />
              <Route path="problem/:id" element={<CreateRoadmapProblem />} />
              <Route path=":id" element={<RoadmapDetail />} />
            </Route>
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
          <Route
            path="/home"
            element={
              <Layout>
                <Main />
              </Layout>
            }
          />
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
