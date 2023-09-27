import axios from 'axios';

const PREFIX_URL = '/api/v1/problem';

/**
 * 문제 정보를 가져온다.
 * params : problemId
 */
export function getProblemInfo(params) {
  return axios.get(`${PREFIX_URL}/find?problemId=${params.problemId}`);
}
