import React from "react";

const Pagination = ({
  employeesPerPage,
  totalEmployees,
  paginate,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalEmployees / employeesPerPage);
  const pageNumbers = [];

  // Limit the number of displayed pages to 5, centered around the current page
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-6 flex justify-center">
      <ul className="inline-flex items-center space-x-2">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md font-medium ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#F72717] text-white transition-transform hover:translate-y-[-.2rem] duration-300"
            }`}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers (only showing 5 pages around the current page) */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 border rounded-md font-medium transition-colors duration-200 ${
                number === currentPage
                  ? "bg-[#F72717] text-white" // Selected page
                  : "bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md font-medium ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#F72717] text-white transition-transform hover:translate-y-[-.2rem] duration-300"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
