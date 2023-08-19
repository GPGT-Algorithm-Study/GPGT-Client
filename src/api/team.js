import axios from 'axios';

const PREFIX_URL = '/api/v1';

/**
 * 특정 팀 정보를 조회한다.
 */
export function getTeamInfo(params) {
  return axios.get(`${PREFIX_URL}/team/info?teamNumber=${params.team}`);
}

/**
 * 모든 팀의 정보를 조회한다.
 */
export function getAllTeams() {
  return axios.get(`${PREFIX_URL}/stat/team/all`);
}
