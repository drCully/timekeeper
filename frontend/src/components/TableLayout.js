import { forwardRef, useEffect, useRef } from 'react'
import { SFlexContainer } from '../styles/containerStyles'
import { SSelect } from '../styles/formStyles'
import { SPaginate } from '../styles/Pagination.styles'

export const SelectedRows = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef()
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
      <input type='checkbox' ref={resolvedRef} {...rest} />
    </>
  )
})

export const TableLayout = ({
  handleRowClick,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  pageCount,
  gotoPage,
  setPageSize,
  prepareRow,
  selectedFlatRows,
  state: { pageIndex, pageSize, selectedRowIds, onSelectedRowsChange },
}) => {
  return (
    <>
      <SFlexContainer justify='end' margin='1rem 0'>
        {pageCount > 1 && (
          <>
            <SPaginate
              padding='0 1em'
              breakLabel='...'
              nextLabel='>'
              previousLabel='<'
              onPageChange={(e) => {
                gotoPage(e.selected)
              }}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
            />
            <SSelect
              defaultValue={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
              width='8rem'
            >
              {[10, 15, 20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} per page
                </option>
              ))}
            </SSelect>
          </>
        )}
      </SFlexContainer>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={handleRowClick}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
