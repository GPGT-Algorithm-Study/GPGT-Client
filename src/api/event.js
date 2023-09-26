import axios from 'axios';

const PREFIX_URL = '/api/v1/event';

/**
 * 현재 유효한 이벤트 목록을 조회한다.
 */
export function getValidPointEvents() {
  return axios.get(`${PREFIX_URL}/point/all/valid`);
}

/**
 *
 * 모든 이벤트 목록을 조회한다.
 */
export function getAllPointEvents() {
  return axios.get(`${PREFIX_URL}/point/all`);
}

const PREFIX_URL_ADMIN = '/api/v1/admin';

/**
 * 포인트 이벤트를 생성한다
 * body => { eventName: "",
 *            description: "",
 *            startTime: LocalDateTime,
 *            endTime: LocalDateTime,
 *            percentage: ""
 *           }
 */
export function postPointEvent(body) {
  return axios.post(`${PREFIX_URL_ADMIN}/point/bonus`, body);
}

/**
 *
 * 포인트 이벤트를 수정한다
 * body => { eventName: "",
 *            description: "",
 *            startTime: LocalDateTime,
 *            endTime: LocalDateTime,
 *            percentage: ""
 *           }
 */
export function putPointEvent(body) {
  return axios.put(`${PREFIX_URL_ADMIN}/point/bonus`, body);
}

/**
 * eventId에 해당하는 포인트 이벤트를 삭제한다
 * @param params { eventId }
 */
export function deletePointEvent(params) {
  return axios.delete(
    `${PREFIX_URL_ADMIN}/point/bonus?eventId=${params.eventId}`,
  );
}
