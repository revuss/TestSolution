interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
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

  return (
    <nav className="mb-4 flex justify-center space-x-4" aria-label="Pagination">
      <button
        className="rounded-lg border border-teal-500 px-2 py-2 text-gray-700"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <span className="sr-only">Previous</span>
        <svg
          className="mt-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`rounded-lg border border-teal-500 px-4 py-2 ${
            currentPage === index + 1
              ? "bg-teal-500 text-white"
              : "text-gray-700"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="rounded-lg border border-teal-500 px-2 py-2 text-gray-700"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <span className="sr-only">Next</span>
        <svg
          className="mt-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
