import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useFetch = (axiosRequest, params, initialValue) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    fetchData();
  }, [axiosRequest]);

  const fetchData = () =>
    axiosRequest(params)
      .then((res) => {
        if (res.status == 200) {
          if (res.data) {
            const { data } = res;
            setData(data);
          }
        } else {
          toast.error(res.message);
        }
      })
      .catch((e) => {
        throw new Error(e);
      });

  return [data, fetchData];
};

export default useFetch;
