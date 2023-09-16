import React, { useEffect, useState, useCallback } from 'react';
import { PaginationWrapper, PageButton, ButtonWrapper } from './style';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from 'react-icons/fa';

/**
 * 페이징 컴포넌트
 */
const Pagination = ({ totalPage, limit, page, setPage }) => {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  const sliceArrayByLimit = useCallback((totalPage, limit) => {
    const totalPageArray = Array(totalPage)
      .fill()
      .map((_, i) => i);
    return Array(Math.ceil(totalPage / limit))
      .fill()
      .map(() => totalPageArray.splice(0, limit));
  }, []);

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
  }, [page]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage]);

  return (
    <PaginationWrapper>
      <FaAngleDoubleLeft onClick={() => setPage(1)} />
      <FaAngleLeft
        onClick={() => {
          if (page !== 1) setPage(page - 1);
        }}
      />
      <ButtonWrapper>
        {currentPageArray?.map((i) => (
          <PageButton
            key={i + 1}
            onClick={() => setPage(i + 1)}
            selected={page === i + 1}
          >
            {i + 1}
          </PageButton>
        ))}
      </ButtonWrapper>
      <FaAngleRight
        onClick={() => {
          if (page !== totalPage) setPage(page + 1);
        }}
      />
      <FaAngleDoubleRight onClick={() => setPage(totalPage)} />
    </PaginationWrapper>
  );
};

export default Pagination;
