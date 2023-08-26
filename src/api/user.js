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
 * @param params { bojHandle, start, end }
 */
export function putUserRandomLevel(params) {
  return axios.put(
    `${PREFIX_URL}/streak/streak/level?bojHandle=${params.bojHandle}&start=${params.start}&end=${params.end}`,
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
 * @param params { bojHandle }
 */
export function getUserPointLog(params) {
  return axios.get(`/api/v1/log/point/user?bojHandle=${params.bojHandle}`);
}

/**
 * 로그인한다.
 * @param params { bojHandle, password }
 */
export function userLogin(params) {
  return axios.post(`${PREFIX_URL}/auth/login`, params);
}
