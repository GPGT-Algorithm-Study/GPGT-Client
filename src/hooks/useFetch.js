import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useFetch = (
  axiosRequest, // axios 함수
  initialValue, // 데이터 초기 값
  initialParams, // 데이터 초기 파라미터
  noDataHandler, // 받은 데이터가 없을 경우 핸들러
) => {
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
          } else {
            if (noDataHandler) noDataHandler();
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
  // [데이터, 데이터 다시 요청, 파라미터 변겅해서 데이터 다시 요청, 데이터 다시 설정]
};

export default useFetch;
