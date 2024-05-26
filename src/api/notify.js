import axios from 'axios';
import { getHeaderRefreshTokenConfig } from 'utils/auth';

const PREFIX_URL = '/api/v1/notify';

/**
 * notifyId에 해당하는 알림을 읽음처리 한다.
 */
export function readNotification(notifyId) {
  return axios.put(
    `${PREFIX_URL}/read`,
    { id: notifyId },
    getHeaderRefreshTokenConfig(),
  );
}
