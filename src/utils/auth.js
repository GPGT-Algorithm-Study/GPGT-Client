import Cookies from 'universal-cookie';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { refreshToken } from 'api/user';

const JWT_EXPIRY_TIME = 60 * 1000; // 만료 시간: 1분
const cookies = new Cookies();

export function setRefreshTokenToCookie(refreshToken) {
  cookies.set('refresh_token', refreshToken, { sameSite: 'strict' });
}

export function getRefreshTokenToCookie() {
  return cookies.get('refresh_token');
}

export function getHeaderRefreshTokenConfig() {
  const token = getRefreshTokenToCookie();
  if (isEmpty(token)) return null;
  return {
    headers: {
      Refresh_Token: `${token}`,
    },
  };
}

export function onSilentRefresh() {
  const token = getRefreshTokenToCookie();
  if (isEmpty(token)) return null;
  const refreshConfig = {
    headers: {
      Refresh_Token: `${token}`,
      Access_Token: '',
    },
  };
  refreshToken(refreshConfig)
    .then((response) => {
      const { data } = response;
      const { accessToken } = data;
      // 재발급 실패 시 로그아웃 처리
      if (isEmpty(accessToken)) {
        logoutProc();
        return;
      }
      axios.defaults.headers.common['Access_Token'] = accessToken;
      setTimeout(() => {
        onSilentRefresh();
      }, JWT_EXPIRY_TIME - 3000);
    })
    .catch((e) => {
      logoutProc();
    });
}

/**
 * 로그아웃 한다.
 * 1. 쿠키에 설정된 리프레시 토큰 삭제
 * 2. axios 헤더에 설정해둔 access 토큰 삭제
 */
export function logoutProc() {
  cookies.remove('refresh_token');
  axios.defaults.headers.common['Access_Token'] = '';
  window.location.href = '/login';
}
