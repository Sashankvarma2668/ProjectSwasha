/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { PAGINATION_LIMIT } from "../../config/constants";
import SimpleSelect from "./select";
import Cookies from "js-cookie";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pagination(props) {
  const [total, setTotal] = useState(props.total);
  const [pagination, setPagination] = useState(props.pagination);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(PAGINATION_LIMIT);
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(true);
  const [paginationLoaded, setPaginationLoaded] = useState(false);
  const numberOfRows = [
    { id: 10, name: "10" },
    { id: 15, name: "15" },
    { id: 20, name: "20" },
    { id: 25, name: "25" },
    { id: 30, name: "30" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
  ];
  useEffect(async () => {
    let to = page * rowsPerPage;
    let from = to - rowsPerPage;
    if (paginationLoaded === true) {
      props.pageChanged({ limit: rowsPerPage, from: from, to: to });
      setPagination({ limit: rowsPerPage, from: from, to: to });
    }
    setPaginationLoaded(true);
    setDisabledPrev(page === 1 ? true : false);
    setDisabledNext(total <= page * rowsPerPage ? true : false);
    // pagination.limit
  }, [page, rowsPerPage]);

  function handleRowsPerPage(noOfRecords) {
    Cookies.set("rows_per_page", noOfRecords, { expires: 10 });
    setRowsPerPage(noOfRecords);
    setPage(total / noOfRecords < 1 ? 1 : Math.ceil(total / noOfRecords));
  }
  return (
    <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{((pagination.from + 1) * 1).toString()}</span> to{" "}
          <span className="font-medium">{((pagination.from + total < pagination.limit ? total : total < pagination.from + pagination.limit ? total : pagination.from + pagination.limit) * 1).toString()}</span> of <span className="font-medium">{total}</span>{" "}
          results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        {numberOfRows ? (
          <>
            <span className="p-2">No of records: </span>
            <div className="w-20">
              <select onChange={(e) => handleRowsPerPage(e.target.value)} value={rowsPerPage} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-nirmaan focus:border-nirmaan sm:text-sm rounded-md">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
                {/* {numberOfRows.map((row) => {
                  console.log(row);
                  <option key={row.name} value={row.name}>
                    {row.name}
                  </option>;
                })} */}
              </select>
              {/* <SimpleSelect options={numberOfRows} selected="0" changeOption={(option) => handleRowsPerPage(option)} /> */}
            </div>
          </>
        ) : (
          ""
        )}

        <button disabled={disabledPrev} onClick={() => setPage(page - 1)} className="ml-2 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-30">
          Previous
        </button>
        <button disabled={disabledNext} onClick={() => setPage(page + 1)} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-30">
          Next
        </button>
      </div>
    </nav>
  );
}
