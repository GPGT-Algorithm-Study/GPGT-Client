const tierClass = ['b', 's', 'g', 'p', 'd', 'r'];

/**
 * 숫자로 들어오는 티어를 문자열로 변경해서 반환한다. (1 -> b5)
 */
export function numToTierStr(tier) {
  return `${tierClass[parseInt(tier / 5)]}${5 - (tier % 5)}`;
}
