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

  useEffect(() => {
    const start = Math.floor((page - 1) / limit) * limit + 1;
    const end = Math.ceil(page / limit) * limit;
    let pageCount = limit;
    if (totalPage < end) {
      pageCount = totalPage - start + 1;
    }
    setCurrentPageArray(Array.from({ length: pageCount }, (_, i) => i + start));
  }, [page, totalPage]);

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
          <PageButton key={i} onClick={() => setPage(i)} selected={page === i}>
            {i}
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
