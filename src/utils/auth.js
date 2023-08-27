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

export function getUserBojHandle(dispatch) {
  const token = cookies.get('refresh_token');
  if (isEmpty(token)) return;
  const refreshConfig = {
    headers: {
      Refresh_Token: `${token}`,
    },
  };
  parseBoj(refreshConfig)
    .then((response) => {
      const { claim } = response.data;
      dispatch(setUser({ bojHandle: claim }));
    })
    .catch((e) => {
      cookies.remove('refresh_token');
      dispatch(logout());
    });
}

export function onSilentRefresh(dispatch) {
  const token = cookies.get('refresh_token');
  if (isEmpty(token)) return;
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
      // 재발급 실패 시 리프레시 토큰 삭제
      if (isEmpty(accessToken)) {
        cookies.remove('refresh_token');
        dispatch(logout());
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
      cookies.remove('refresh_token');
      dispatch(logout());
    });
}
