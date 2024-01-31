import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { Column, useTable, useSortBy, usePagination } from "react-table";

// pageCount : Total Pages , but since the index starts from 0 , total pages = pageCount - 1

// pageIndex : Current Page Index , but It starts with 0th index .
// So while displaying the page Index we do , pageIndex + 1, so that the initalPage is respresented by 1 instead of 0. .

// canNextPage : boolean
// canPreviousPage : boolean
// pageSize : number of items in one page
// gotoPage : go the the specific indexed page ,
// gotoPage(pageCount - 1) : Goes to last page 
// gotoPage(0) : Goes to last page First Page


function TableHOC<T extends Object>(
  columns: Column<T>[],
  data: T[],
  showPagination: boolean
) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    // Pagination Main use varibales
    pageCount,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex ,pageSize},
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    },
    useSortBy,
    usePagination
  );
  return function () {
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <AiOutlineSortAscending />
                        ) : (
                          <AiOutlineSortDescending />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* pagination */}
        {(showPagination && data.length > pageSize ) && (
          <div className="table-pagination">
            <button disabled={!canPreviousPage} onClick={()=>previousPage()}>
              Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button disabled={!canNextPage} onClick={()=>nextPage()}>
              Next
            </button>
          </div>
        )}
      </>
    );
  };
}

export default TableHOC;
