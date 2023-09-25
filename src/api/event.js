import axios from 'axios';

const PREFIX_URL = '/api/v1/event';

/**
 * 현재 유효한 이벤트 목록을 조회한다.
 */
export function getValidPointEvents() {
  return axios.get(`${PREFIX_URL}/point/all/valid`);
}
