import axios from 'axios';
import { getHeaderRefreshTokenConfig } from 'utils/auth';

const PREFIX_URL = '/api/v1';

/**
 * 모든 유저의 랜덤 문제 생성 및 할당 (서버용)
 */
export function makeAllUsersTodayRandomProblem() {
  return axios.post(
    `${PREFIX_URL}/user/streak/make-random-problem`,
    getHeaderRefreshTokenConfig(),
  );
}

/**
 * 모든 유저의 오늘 잔디 생성 (서버용)
 */
export function makeAllUsersTodayRandomStreakJandi() {
  return axios.post(
    `${PREFIX_URL}/user/streak/grass/all`,
    getHeaderRefreshTokenConfig(),
  );
}

/**
 * 모든 유저의 일일 통계 다시 계산하기
 */
export function computeTodayUserStats() {
  return axios.post(
    `${PREFIX_URL}/stat/user/integrity-check`,
    getHeaderRefreshTokenConfig(),
  );
}

/**
 * 크론 배치잡 (Every 20 min)
 */
export function runCronEveryTermJob() {
  return axios.get(
    `${PREFIX_URL}/scraping/cron/batch`,
    getHeaderRefreshTokenConfig(),
  );
}

/**
 * 크론 배치잡 (EveryDay 6 O'Clock)
 */
export function runCronEveryDayTermJob() {
  return axios.get(
    `${PREFIX_URL}/scraping/cron/batch/daily`,
    getHeaderRefreshTokenConfig(),
  );
}

/**
 * 크론 배치잡 (Evrey Week Job)
 */
export function runCronEveryWeekTermJob() {
  return axios.get(
    `${PREFIX_URL}/scraping/cron/batch/weekly`,
    getHeaderRefreshTokenConfig(),
  );
}
