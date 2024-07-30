/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface TableProps {
  rowsToShow: any[];
  rowsLimit: number;
  currentPage: number;
  activeColumn: string;
  sortingColumn: string;
  sortByColumn: (column: string) => void;
}

const Table: React.FC<TableProps> = ({
  rowsToShow,
  rowsLimit,
  currentPage,
  activeColumn,
  sortingColumn,
  sortByColumn,
}) => {
  return (
    <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none">
      <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
        <thead
          className={`rounded-lg text-base text-white font-semibold w-full ${
            rowsToShow.length > 0 ? "border-b-0" : "border-b-2 border-black"
          }`}
        >
          <tr className="bg-[#222E3A]/[6%] border-x-2 border-t-2 border-black">
            <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
              ID
            </th>
            <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group min-w-[156px]">
              <div className="flex items-center">
                <svg
                  className={`w-4 h-4 cursor-pointer ${
                    activeColumn.includes("Category")
                      ? "text-black"
                      : "text-[#BCBDBE] group-hover:text-black rotate-180"
                  } ${
                    sortingColumn.includes("Category")
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                  onClick={() => sortByColumn("Category")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <span
                  className="cursor-pointer pl-1"
                  onClick={() => sortByColumn("Category")}
                >
                  Category
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="border-x-2 border-black border-b-2">
          {rowsToShow.map((data, index) => (
            <tr
              key={index}
              className={`${index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"}`}
            >
              <td
                className={`py-2 px-3 font-normal text-base ${
                  index === 0 ? "border-t-2 border-black" : "border-t"
                } whitespace-nowrap`}
              >
                {rowsLimit * currentPage + index + 1}
              </td>
              <td
                className={`py-2 px-3 font-normal text-base ${
                  index === 0 ? "border-t-2 border-black" : "border-t"
                } whitespace-nowrap`}
              >
                {data.Category}
              </td>
              <td
                className={`py-2 px-3 font-normal text-base ${
                  index === 0 ? "border-t-2 border-black" : "border-t"
                } whitespace-nowrap`}
              >
                {data.Company}
              </td>
              <td
                className={`py-2 px-3 text-base font-normal ${
                  index === 0 ? "border-t-2 border-black" : "border-t"
                } whitespace-nowrap`}
              >
                {data.Product}
              </td>
              <td
                className={`py-2 px-3 text-base font-normal ${
                  index === 0 ? "border-t-2 border-black" : "border-t"
                } min-w-[250px]`}
              >
                {data.Description}
              </td>
              <td
                className={`py-5 px-4 text-base font-normal ${
                  index === 0 ? "border-t-2 border-black" : "border-t"
                }`}
              >
                ${data.Price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
