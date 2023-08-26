import axios from 'axios';

const PREFIX_URL = '/api/v1/item';

/**
 * 모든 아이템 목록을 조회한다.
 */
export function getAllItems() {
  return axios.get(`${PREFIX_URL}/all`);
}

/**
 * bojHandle에 해당하는 사용자의 아이템 목록을 조회한다.
 * @param params { bojHandle }
 */
export function getUserItems(params) {
  return axios.get(`${PREFIX_URL}/user?bojHandle=${params.bojHandle}`);
}

/**
 * bojHandle에 해당하는 사용자가 itemId에 해당하는 아이템을 구매한다.
 * 나의 한마디 아이템을 사용할 경우 message를 추가로 전달한다.
 * @param params { itemId, bojHandle, message }
 */
export function buyItem(params) {
  return axios.post(
    `${PREFIX_URL}/buy?bojHandle=${params.bojHandle}&itemId=${params.itemId}`,
  );
}

/**
 * bojHandle에 해당하는 사용자가 itemId에 해당하는 아이템을 사용한다.
 * @param params { itemId, bojHandle }
 */
export function useItem(params) {
  return axios.put(
    `${PREFIX_URL}/use?bojHandle=${params.bojHandle}&itemId=${
      params.itemId
    }&message=${params.message || ''}`,
  );
}

/**
 *
 */
export function getLastComment() {
  return axios.get('api/v1/boolshit/last');
}
