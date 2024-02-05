export const boardType = {
  FREE: {
    label: '자유',
    key: 'free',
  },
  PS: {
    label: '문제 풀이',
    key: 'ps',
  },
  QUES: {
    label: '질문',
    key: 'question',
  },
  NOTICE: {
    label: '공지사항',
    key: 'notice',
  },
  MY: {
    label: '내가 쓴 글',
    key: 'myboard',
  },
  SEARCH: {
    label: '전체 검색 결과',
    key: 'search',
  },
};

export function getTypeLabel(type) {
  let label = '';
  Object.keys(boardType).forEach((key) => {
    if (boardType[key].key === type) {
      label = boardType[key].label;
      return;
    }
  });
  return label;
}

export const writeType = {
  WRITE: 1,
  EDIT: 2,
};

export const SIZE = 10;
