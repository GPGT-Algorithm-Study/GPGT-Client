import Cookies from 'universal-cookie';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { refreshToken, parseBoj } from 'api/user';
import { logout, setUser } from 'redux/user';

const JWT_EXPIRY_TIME = 60 * 1000; // 만료 시간: 1분
const cookies = new Cookies();

export function setRefreshTokenToCookie(refreshToken) {
  cookies.set('refresh_token', refreshToken, { sameSite: 'strict' });
}

export function getRefreshTokenToCookie() {
  return cookies.get('refresh_token');
}

export function getHeaderRefreshTokenConfing() {
  const token = getRefreshTokenToCookie();
  if (isEmpty(token)) return null;
  return {
    headers: {
      Refresh_Token: `${token}`,
    },
  };
}

export function getUserBojHandle(dispatch) {
  const refreshConfig = getHeaderRefreshTokenConfing();
  parseBoj(refreshConfig)
    .then((response) => {
      const { claim } = response.data;
      dispatch(setUser({ bojHandle: claim }));
    })
    .catch((e) => {
      logoutProc(dispatch);
    });
}

export function onSilentRefresh(dispatch) {
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
        logoutProc(dispatch);
        return;
      }
      axios.defaults.headers.common['Access_Token'] = accessToken;
      // 재발급 성공 시 refresh_token으로 사용자 정보를 다시 가져온다.
      getUserBojHandle(dispatch);
      setTimeout(() => {
        onSilentRefresh(dispatch);
      }, JWT_EXPIRY_TIME - 3000);
    })
    .catch((e) => {
      logoutProc(dispatch);
    });
}

/**
 * 로그아웃 한다.
 * 1. 쿠키에 설정된 리프레시 토큰 삭제
 * 2. redux에 저장된 사용자 정보 삭제
 * 3. axios 헤더에 설정해둔 access 토큰 삭제
 */
export function logoutProc(dispatch) {
  cookies.remove('refresh_token');
  if (dispatch) dispatch(logout());
  axios.defaults.headers.common['Access_Token'] = '.';
  window.location.href = '/login';
}
