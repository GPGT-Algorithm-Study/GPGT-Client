export const complaintProcessingType = {
  WAITING: {
    label: '대기 중',
    key: 'WAITING',
  },
  PROCESSING: {
    label: '처리 중',
    key: 'PROCESSING',
  },
  DONE: {
    label: '처리 완료',
    key: 'DONE',
  },
};

export function getTypeLabel(type) {
  let label = '';
  Object.keys(complaintProcessingType).forEach((key) => {
    if (complaintProcessingType[key].key === type) {
      label = complaintProcessingType[key].label;
      return;
    }
  });
  return label;
}
