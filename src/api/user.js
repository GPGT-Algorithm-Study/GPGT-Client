import axios from 'axios';

const PREFIX_URL = '/api/v1/user';

/**
 * 모든 유저 정보를 조회한다.
 */
export function getAllUsers() {
  return axios.get(`${PREFIX_URL}/info/all`);
}

/**
 * bojHandle에 해당하는 사용자가 오늘 푼 문제 정보를 조회한다.
 * @param {string} bojHandle 백준아이디
 */
export function getUserTodaySolvedProblems(bojHandle) {
  return axios.get(`${PREFIX_URL}/info/today-solved?bojHandle=${bojHandle}`);
}

/**
 *
 * bojHandle에 해당하는 사용자가 오늘의 랜덤 문제 정보를 조회한다.
 * @param {string} bojHandle 백준아이디
 */
export function getUserTodayRandomProblem(bojHandle) {
  return axios.get(`${PREFIX_URL}/streak/streak?bojHandle=${bojHandle}`);
}

/**
 *
 * bojHandle에 해당하는 사용자의 랜덤 스트릭 정보를 조회한다. (잔디 조회)
 * @param {string} bojHandle 백준아이디
 */
export function getUserRandomStreakGrass(bojHandle) {
  return axios.get(`${PREFIX_URL}/streak/grass?bojHandle=${bojHandle}`);
}
