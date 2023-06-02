import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { toast } from 'react-toastify'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import {
  useTable,
  useFlexLayout,
  usePagination,
  useRowSelect,
  useSortBy,
} from 'react-table'
import { TableLayout } from '../../components/TableLayout'
import {
  useTimeslipsQuery,
  useDeleteTimeslipMutation,
} from '../timeslips/timeslipsApiSlice'

export function ProfileHoursDetail({
  userId,
  billedStatus,
  searchDescription,
}) {
  const { data: timeslips, isLoading } = useTimeslipsQuery(
    `timekeeper=${userId}&billed=${billedStatus}&description=${searchDescription}`,
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const [tableData, setTableData] = useState(null)

  const [deleteTime] = useDeleteTimeslipMutation()

  useEffect(() => {
    setTableData(timeslips)
  }, [timeslips])

  if (isLoading || !tableData) {
    return <div>Loading...</div>
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this time record? ')) {
      await deleteTime(id)
      toast.success('Time Record Deleted Successfully')
    }
  }

  return <TableInstance tableData={tableData} handleDelete={handleDelete} />
}

const TableInstance = ({ tableData, handleDelete }) => {
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
        width: 45,
        minWidth: 45,
        maxWidth: 45,
      },
      {
        Header: 'Client',
        accessor: 'client.name',
        width: 90,
        minWidth: 90,
        maxWidth: 90,
      },
      {
        Header: 'Hours',
        accessor: 'hours',
        Cell: ({ value }) => (
          <div style={{ textAlign: 'center' }}>
            {new Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
            }).format(value)}
          </div>
        ),
        width: 35,
        minWidth: 35,
        maxWidth: 35,
      },
      {
        Header: 'Description',
        accessor: 'description',
        width: 250,
        minWidth: 150,
        maxWidth: 250,
      },
    ]
    return [columns, tableData]
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

  const actionColumn = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        Header: 'Action',
        minWidth: 35,
        width: 35,
        maxWidth: 35,
        align: 'center',
        Cell: ({ row }) => (
          <div style={{ textAlign: 'center' }}>
            <Link to={`/timeslip/${row.original._id}`}>
              <FaRegEdit
                style={{
                  color: 'green',
                  marginRight: '.7em',
                }}
              />
            </Link>
            <FaRegTrashAlt
              style={{
                cursor: 'pointer',
                color: 'red',
              }}
              onClick={() => handleDelete(row.original._id)}
            />
          </div>
        ),
      },
    ])
  }

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: 15,
        sortBy: [{ id: 'date', desc: false }],
      },
    },
    useFlexLayout,
    useSortBy,
    usePagination,
    useRowSelect,
    actionColumn
  )

  return <TableLayout {...tableInstance} />
}
