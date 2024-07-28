import React from "react";

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  page,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className="px-4 py-2 m-2 bg-rose-300 rounded hover:bg-teal-400 transition duration-300"
      >
        Previous
      </button>
      <span className="px-4 py-2 m-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-4 py-2 m-2 bg-rose-300 rounded hover:bg-teal-400 transition duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
