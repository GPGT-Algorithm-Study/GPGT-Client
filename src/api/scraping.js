import axios from 'axios';

const PREFIX_URL = '/api/v1/scraping';

/**
 * 사용자 정보를 수동으로 수집한다.
 */
export function scrapUserInfo(bojHandle) {
  return axios.post(`${PREFIX_URL}/user/?bojHandle=${bojHandle}`);
}
