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

/**
 * bojHandle에 해당하는 사용자에게 경고를 부여/차감한다
 * @param params { bojHandle, changedValue, description }
 */
export function postUserWarning(params) {
  return axios.post(
    `${PREFIX_URL}/warning/user/save?bojHandle=${params.bojHandle}&changedValue=${params.changedValue}&description=${params.description}`,
  );
}
