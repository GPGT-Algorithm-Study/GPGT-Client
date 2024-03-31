import axios from 'axios';
import { getHeaderRefreshTokenConfig } from 'utils/auth';

const PREFIX_URL = '/api/v1/complaint';
const PROCESSOR_PREFIX_URL = PREFIX_URL + '/processor';
const REQUESTER_PREFIX_URL = PREFIX_URL + '/requester';

/**
 * (관리자용) 모든 사용자의 모든 민원을 조회
 *
 */
export function getAllComplaint() {
  return axios.get(
    `${PROCESSOR_PREFIX_URL}/all`,
    getHeaderRefreshTokenConfig(),
  );
}

/**
 * (관리자용) 모든 사용자의 모든 민원을 최신 순으로 조회
 *
 */
export function getAllSortedComplaint() {
  return axios.get(`${PROCESSOR_PREFIX_URL}/all/sort`);
}

/**
 * (관리자용) 특정 요청자의 모든 민원 조회
 * params : requester
 */
export function getComplaintOfRequester(params) {
  return axios.get(
    `${PROCESSOR_PREFIX_URL}/requester?requester=${params.requester}`,
  );
}

/**
 * (관리자용) 특정 처리자의 모든 처리 민원 조회
 * params : processor
 */
export function getComplaintOfProcessor(params) {
  return axios.get(
    `${PROCESSOR_PREFIX_URL}/processor?processor=${params.processor}`,
  );
}

/**
 * (관리자용) 특정 유형의 민원 조회
 * params : complaintType
 */
export function getComplaintByType(params) {
  return axios.get(
    `${PROCESSOR_PREFIX_URL}/complaint-type?complaintType=${params.complaintType}`,
  );
}

/**
 * (관리자용) 특정 민원의 상태 변경
 * params : id(Number), processType, processor, reply
 */
export function updateComplaintType(params) {
  return axios.put(`${PROCESSOR_PREFIX_URL}/`, params);
}

/**
 * 나의 모든 민원 조회
 */
export function getMyComplaint() {
  return axios.get(`${REQUESTER_PREFIX_URL}/all`);
}

/**
 * 민원 등록
 * complaint : requester, content, complaintType(Number)
 */
export function createComplaint(complaint) {
  return axios.post(`${REQUESTER_PREFIX_URL}/register`, complaint);
}

/**
 * 민원 수정
 * complaint : requester, content, complaintType(Number)
 */
export function updateComplaint(complaint) {
  return axios.post(`${REQUESTER_PREFIX_URL}/update`, complaint);
}

/**
 * 민원 삭제
 * params : id(Number)
 */
export function deleteComplaint(params) {
  return axios.delete(`${REQUESTER_PREFIX_URL}/delete`, params);
}
