import axios from 'axios';

const PREFIX_URL = '/api/v1';

export function getAlterationShopList(userId, start, end) {
  return axios.get(
    `${PREFIX_URL}/recommend?userId=${userId}&start=${start}&end=${end}`,
  );
}
