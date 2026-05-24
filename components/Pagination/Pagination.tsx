"use client";

import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={css.pagination}>
      <button
        className={css.button}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
      >
        ← Prev
      </button>
      <span className={css.info}>
        {currentPage} / {totalPages}
      </span>
      <button
        className={css.button}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={
          currentPage === totalPages
        }
      >
        Next →
      </button>
    </div>
  );
}
