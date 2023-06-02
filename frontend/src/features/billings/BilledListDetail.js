import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  useTable,
  useFlexLayout,
  usePagination,
  useRowSelect,
  useSortBy,
} from 'react-table'
import { format, parseISO } from 'date-fns'
import { TableLayout } from '../../components/TableLayout'
import { useInvoicesQuery } from '../invoices/invoicesApiSlice'

export function BilledListDetail() {
  const { data: invoices, isLoading, isSuccess } = useInvoicesQuery()

  const [tableData, setTableData] = useState(null)

  useEffect(() => {
    if (isSuccess) {
      setTableData(invoices)
    }
  }, [invoices])

  if (isLoading || !tableData) {
    return <div>Loading...</div>
  }

  return <TableInstance tableData={tableData} />
}

const TableInstance = ({ tableData }) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => (
          <div style={{ textAlign: 'center' }}>
            {format(parseISO(value), 'MM/dd/yyyy')}
          </div>
        ),
        width: 40,
        minWidth: 40,
        maxWidth: 40,
      },
      {
        Header: 'Number',
        accessor: 'number',
        width: 30,
        minWidth: 25,
        maxWidth: 30,
        Cell: ({ row }) => (
          <Link
            to={`/invoice/${row.original._id}`}
            style={{
              cursor: 'pointer',
              color: 'green',
              textDecoration: 'none',
            }}
          >
            {row.original.number}
          </Link>
        ),
      },
      {
        Header: 'Client',
        accessor: 'client.name',
        width: 90,
        minWidth: 90,
        maxWidth: 90,
      },
      {
        Header: 'Amount',
        Cell: ({ row }) => (
          <div style={{ textAlign: 'right' }}>
            {new Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(row.original.subTotal + row.original.salesTax)}
          </div>
        ),
        width: 40,
        minWidth: 40,
        maxWidth: 40,
      },
    ]
    return [columns, tableData]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData])

  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
      align: 'center',
    }),
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: 15,
        hiddenColumns: ['clientId'],
        sortBy: [{ id: 'date', desc: true }],
      },
    },
    useFlexLayout,
    useSortBy,
    usePagination,
    useRowSelect
  )

  return <TableLayout {...tableInstance} />
}
