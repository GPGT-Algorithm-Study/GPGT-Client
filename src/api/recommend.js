import axios from 'axios';

const PREFIX_URL = '/api/v1';

/**
 * 문제를 추천받는다.
 * @param {string} userId 백준 id. 해당 사용자가 푼 문제는 제외 됨
 * @param {string} start 추천 시작 난이도
 * @param {string} end 추천 끝 난이도
 * @param {boolean} isKo 한국어 문제만 추천 여부
 * @returns 추천된 문제가 배열로 전달된다.(최대 30개)
 */
export function getRecommend(userId, start, end, isKo) {
  return axios.get(
    `${PREFIX_URL}/recommend?userId=${userId}&start=${start}&end=${end}&isKo=${isKo}`,
  );
}
