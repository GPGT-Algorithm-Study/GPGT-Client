import axios from 'axios';
import { ROADMAP_PREFIX_URL } from 'utils/constants';

/**
 * 로드맵 생성
 */
export function createRoadmap(name) {
  return axios.post(`${ROADMAP_PREFIX_URL}/create?name=${name}`);
}

/**
 * 로드맵 수정
 */
export function updateRoadmap(id, name) {
  return axios.put(`${ROADMAP_PREFIX_URL}/update?id=${id}&name=${name}`);
}

/**
 * 로드맵 삭제
 */
export function deleteRoadmap(id) {
  return axios.delete(`${ROADMAP_PREFIX_URL}/delete?id=${id}`);
}

/**
 * 로드맵 문제 생성
 */
export function createRoadmapProblem({ roadmapId, problemId, week, index }) {
  return axios.post(
    `${ROADMAP_PREFIX_URL}/problem/add?roadmapId=${roadmapId}&problemId=${problemId}&week=${week}&index=${index}`,
  );
}

/**
 * 로드맵 문제 삭제
 */
export function deleteRoadmapProblem(id) {
  return axios.delete(`${ROADMAP_PREFIX_URL}/problem/delete?id=${id}`);
}
