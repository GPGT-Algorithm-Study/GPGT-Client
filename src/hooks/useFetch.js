import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useFetch = (axiosRequest, initialValue, initialParams) => {
  const [data, setData] = useState(initialValue);
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    fetchData();
  }, [axiosRequest, params]);

  const fetchData = () =>
    axiosRequest(params)
      .then((res) => {
        if (res.status == 200) {
          if (res.data) {
            const { data } = res;
            setData(data);
          }
        } else {
          toast.error('데이터를 받아오지 못했습니다.');
        }
      })
      .catch((e) => {
        const res = e.response;
        toast.error(res.data.message);
      });

  return [data, fetchData, setParams, setData];
};

export default useFetch;
