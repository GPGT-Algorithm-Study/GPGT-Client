import axios from 'axios';

const PREFIX_URL = '/api/v1/user';

/**
 * 모든 유저 정보를 조회한다.
 */
export function getAllUsers() {
  return axios.get(`${PREFIX_URL}/info/all`);
}

/**
 * bojHandle에 해당하는 사용자 정보를 조회한다.
 * @param {string} bojHandle 백준아이디
 */
export function getUserInfo(params) {
  return axios.get(`${PREFIX_URL}/info?bojHandle=${params.bojHandle}`);
}

/**
 * bojHandle에 해당하는 사용자가 오늘 푼 문제 정보를 조회한다.
 * @param {string} bojHandle 백준아이디
 */
export function getUserTodaySolvedProblems(params) {
  return axios.get(
    `${PREFIX_URL}/info/today-solved?bojHandle=${params.bojHandle}`,
  );
}

/**
 *
 * bojHandle에 해당하는 사용자가 오늘의 랜덤 문제 정보를 조회한다.
 * @param {string} bojHandle 백준아이디
 */
export function getUserTodayRandomProblem(params) {
  return axios.get(`${PREFIX_URL}/streak/streak?bojHandle=${params.bojHandle}`);
}

/**
 * bojHandle에 해당하는 사용자의 랜덤 문제 난이도 정보를 설정한다.
 * @param params { bojHandle, start, end, isKo }
 */
export function putUserRandomLevel(params) {
  return axios.put(
    `${PREFIX_URL}/streak/streak/level?bojHandle=${params.bojHandle}&start=${params.start}&end=${params.end}&isKo=${params.isKo}`,
  );
}

/**
 *
 * bojHandle에 해당하는 사용자의 랜덤 스트릭 정보를 조회한다. (잔디 조회)
 * @param {string} bojHandle 백준아이디
 */
export function getUserRandomStreakGrass(params) {
  return axios.get(`${PREFIX_URL}/streak/grass?bojHandle=${params.bojHandle}`);
}

/**
 *
 * bojHandle에 해당하는 사용자의 포인트 로그를 조회한다.
 * @param params { bojHandle, page, size }
 */
export function getUserPointLog(params) {
  return axios.get(
    `/api/v1/log/point/user/page?bojHandle=${params.bojHandle}&page=${params.page}&size=${params.size}`,
  );
}

/**
 * 로그인한다.
 * @param params { bojHandle, password }
 */
export function userLogin(params) {
  return axios.post(`${PREFIX_URL}/auth/login`, params);
}

/**
 * refresh token으로 access token을 재발급 한다.
 * 헤더로 refresh token을 전달한다.
 */
export function refreshToken(config) {
  return axios.get(`${PREFIX_URL}/auth/refresh`, config);
}

/**
 * 리프레시 토큰을 헤더에 전달하여 bojHandle을 가져온다.
 */
export function parseBoj(config) {
  return axios.get(`${PREFIX_URL}/auth/parse/boj`, config);
}

/**
 * 로그아웃한다.
 * 헤더에 리프레쉬 토큰 전달
 * @param params { bojHandle }
 */
export function userLogout(params, config) {
  return axios.post(`${PREFIX_URL}/auth/logout`, params, config);
}

/**
 * 비밀번호를 변경한다.
 * @param params { bojHandle, oldPassword, newPassword }
 */
export function changePassword(params, config) {
  return axios.post(`${PREFIX_URL}/auth/pwchange`, params, config);
}
