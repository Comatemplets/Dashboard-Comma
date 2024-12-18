import { useState } from "react";
function Pagination({ totalProducts, productsPerPage, paginate, currentPage }) {
  const pageNumbers = [];
  const [isActive, SetisActive] = useState("");
  // Calculate total number of pages
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex justify-center gap-2 my-3">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item flex justify-center items-center w-7 h-7 text-xs cursor-pointer text-gray-500 hover:text-main border hover:border-main rounded-md  ${
              currentPage === number ? "active" : ""
            }`}
            onClick={() => paginate(number)}>
            {/* // Add active class */}
            <a className="page-link">{number}</a>
          </li>
        ))}
        {pageNumbers.length === 1 ? (
          <li className={`page-item`}>
            {/* // Add active class */}
            <a className="unavilable-page-link  flex justify-center items-center w-7 h-7 text-xs cursor-not-allowed text-gray-500  rounded-md ">
              2
            </a>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
