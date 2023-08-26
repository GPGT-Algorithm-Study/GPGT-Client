import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function setRefreshTokenToCookie(refreshToken) {
  cookies.set('refresh_token', refreshToken, { sameSite: 'strict' });
}

export function logout() {
  cookies.remove('refresh_token');
}
