import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { logoutProc } from 'utils/auth';

// axios설정
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 응답 코드가 403일경우 리프레쉬 토큰 만료: 로그아웃 처리
    if (error.response?.status === 403) {
      logoutProc();
    }
    return Promise.reject(error);
  },
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
