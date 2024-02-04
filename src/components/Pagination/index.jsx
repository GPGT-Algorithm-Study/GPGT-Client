import React, { useEffect, useState } from 'react';
import { PaginationWrapper, PageButton, ButtonWrapper } from './style';
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi2';

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
      <HiOutlineChevronDoubleLeft onClick={() => setPage(1)} />
      <HiOutlineChevronLeft
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
      <HiOutlineChevronRight
        onClick={() => {
          if (page !== totalPage) setPage(page + 1);
        }}
      />
      <HiOutlineChevronDoubleRight onClick={() => setPage(totalPage)} />
    </PaginationWrapper>
  );
};

export default Pagination;
