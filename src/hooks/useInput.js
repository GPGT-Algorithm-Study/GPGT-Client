import { Dispatch, SetStateAction, useState } from 'react';

/**
 * input용 커스텀 훅..
 */
const useInput = (initialData) => {
  const [value, setValue] = useState(initialData);
  const handler = (e) => {
    setValue(e.target.value);
  };
  return [value, handler, setValue];
};

export default useInput;
