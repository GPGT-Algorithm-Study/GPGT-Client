import axios from 'axios';

const PREFIX_URL = '/api/v1/log';

/**
 *
 * bojHandle에 해당하는 사용자의 포인트 로그를 조회한다.
 * @param params { bojHandle, page, size }
 */
export function getUserPointLog(params) {
  return axios.get(
    `${PREFIX_URL}/point/user/page?bojHandle=${params.bojHandle}&page=${params.page}&size=${params.size}`,
  );
}

/**
 *
 * bojHandle에 해당하는 사용자의 경고 로그를 조회한다.
 * @param params { bojHandle, page, size }
 */
export function getUserWarningLog(params) {
  return axios.get(
    `${PREFIX_URL}/warning/user/page?bojHandle=${params.bojHandle}&page=${params.page}&size=${params.size}`,
  );
}

/**
 *
 * 전체 사용자 경고 로그를 조회
 */
export function getAllWarningLog() {
  return axios.get(`${PREFIX_URL}/warning/all`);
}
