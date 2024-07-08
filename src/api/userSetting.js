import axios from 'axios';
import { getHeaderRefreshTokenConfig } from 'utils/auth';

const PREFIX_URL = '/api/v1/user/setting';

/**
 * 전체 사용자의 설정 정보를 가져온다.
 */
export function getAllUserSettingInfo() {
  return axios.get(`${PREFIX_URL}/all`, getHeaderRefreshTokenConfig());
}

/**
 * 특정 사용자의 설정 정보를 가져온다.
 */
export function getUserSettingInfo(bojHandle) {
  return axios.get(
    `${PREFIX_URL}?bojHandle=${bojHandle}`,
    getHeaderRefreshTokenConfig(),
  );
}

/**
 * 특정 사용자의 경고 설정을 토글한다.
 */
export function toggleUserWarningSetting(bojHandle) {
  return axios.put(
    `${PREFIX_URL}/toggle/warning?bojHandle=${bojHandle}`,
    getHeaderRefreshTokenConfig(),
  );
}

/**
 * 특정 사용자의 크롤링 설정을 토글한다.
 */
export function toggleUserScrapingSetting(bojHandle) {
  return axios.put(
    `${PREFIX_URL}/toggle/scraping?bojHandle=${bojHandle}`,
    getHeaderRefreshTokenConfig(),
  );
}
