import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ data, page, setPage }) => {
  // const totalPages = Math.ceil(data.count / pageSize);

  return (
    <div className="flex sm:py-5 sm:pb-10 last:sm:mr-4">
      {data.results.map((elem, index) => {
        return index + 1 >= page - 2 && index + 1 <= page + 2 ? (
          <div
            className={index + 1 === page ? `page` : undefined}
            key={index}
            onClick={() => {
              setPage(index + 1);
            }}
          >
            <div className="px-3 py-1">{index + 1}</div>
          </div>
        ) : null;
      })}
    </div>

    // <div className="flex sm:py-5 sm:pb-10">
    //   {page > 1 ? (
    //     <button
    //       className="chevron"
    //       onClick={() => {
    //         setPage(page - 1);
    //       }}
    //     >
    //       <FontAwesomeIcon icon="chevron-left" />
    //     </button>
    //   ) : (
    //     <div className="hidden"></div>
    //   )}
    //   <div className="Pagination--title">
    //     Page {page} sur {totalPages}
    //   </div>
    //   {page < totalPages ? (
    //     <button
    //       className="chevron"
    //       onClick={() => {
    //         setPage(page + 1);
    //       }}
    //     >
    //       <FontAwesomeIcon icon="chevron-right" />
    //     </button>
    //   ) : (
    //     <div className="hidden"></div>
    //   )}
    // </div>
  );
};

export default Pagination;
