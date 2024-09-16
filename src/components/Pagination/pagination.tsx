import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          onClick={() => onPageChange(i)}
          className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 text-base font-bold ${
            currentPage === i
              ? "bg-blue-500 text-white border-blue-500"
              : "text-[#333] hover:bg-gray-50"
          }`}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  return (
    <>
      <ul className="flex justify-center space-x-4">
        {/* Previous Button */}
        <li
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            currentPage === 1 ? "dark:bg-gray-300" : "cursor-pointer bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={handlePrevious}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-gray-400"
            viewBox="0 0 55.753 55.753"
          >
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </li>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next Button */}
        <li
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "cursor-pointer bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 rotate-180 fill-gray-400"
            viewBox="0 0 55.753 55.753"
          >
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
