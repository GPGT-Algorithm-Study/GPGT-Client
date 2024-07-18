const tierClass = ['b', 's', 'g', 'p', 'd', 'r'];
const tierClassKo = [
  '브론즈',
  '실버',
  '골드',
  '플래티넘',
  '다이아몬드',
  '루비',
];
const tierColor = [
  '#a25c1f',
  '#435972',
  '#e09f37',
  '#5ac48f',
  '#50b1f6',
  '#ea3364',
];
const tierMap = { b: 0, s: 1, g: 2, p: 3, d: 4, r: 5 };

/**
 * 숫자로 들어오는 티어를 문자열로 변경해서 반환한다. (0 -> b5)
 */
export function numToTierStr(tier) {
  return `${tierClass[parseInt(tier / 5)]}${5 - (tier % 5)}`;
}

/**
 * 숫자로 들어오는 티어를 한글 문자열로 변경해서 반환한다. (0 -> 브론즈 5)
 */
export function numToTierStrKo(tier) {
  if (tier === 0) {
    return 'Unrated';
  }
  return `${tierClassKo[parseInt(tier / 5)]} ${5 - (tier % 5)}`;
}

/**
 * 숫자로 들어오는 티어의 색상 반환 0~4 -> 브론즈
 */
export function getTierColor(tier) {
  if (tier === 0) {
    return '#282828';
  }
  return tierColor[parseInt(tier / 5)];
}

/**
 * 문자열로 들어오는 티어를 숫자로 변경해서 반환한다. (b5 -> 0)
 */
export function tierStrToNum(tier) {
  return tierMap[tier[0]] * 5 + (5 - parseInt(tier[1]));
}
