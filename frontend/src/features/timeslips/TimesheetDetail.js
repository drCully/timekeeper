import { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
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
} from './timeslipsApiSlice'

export function TimesheetDetail() {
  const timekeeper = useAuth().userId
  const { timesheetDate } = useSelector((state) => state.session)

  const {
    data: timeslips,
    isLoading,
    isSuccess,
  } = useTimeslipsQuery(`date=${timesheetDate}&timekeeper=${timekeeper}`, {
    refetchOnMountOrArgChange: true,
  })

  const [tableData, setTableData] = useState(null)
  const [deleteTime] = useDeleteTimeslipMutation()

  useEffect(() => {
    if (isSuccess) {
      setTableData(timeslips)
    }
  }, [isSuccess, timeslips])

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
        Header: 'Client',
        accessor: 'client.name',
        width: 70,
        minWidth: 70,
        maxWidth: 70,
      },
      {
        Header: 'Task',
        accessor: 'task.name',
        width: 40,
        minWidth: 40,
        maxWidth: 40,
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
      initialState: { pageIndex: 0, pageSize: 15 },
    },
    useFlexLayout,
    useSortBy,
    usePagination,
    useRowSelect,
    actionColumn
  )

  return <TableLayout {...tableInstance} />
}
