export const boardType = {
  FREE: {
    label: '자유게시판',
    key: 'free',
  },
  PS: {
    label: '문제풀이',
    key: 'ps',
  },
  QUES: {
    label: '질문게시판',
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
