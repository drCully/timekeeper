import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCheck, FaTimes, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import {
  useTable,
  useFlexLayout,
  usePagination,
  useRowSelect,
  useSortBy,
} from 'react-table'
import { TableLayout } from '../../components/TableLayout'
import { useClientsQuery, useDeleteClientMutation } from './clientsApiSlice'

export function ClientsListDetail({ searchClient, activeStatus }) {
  const { data: clients, isLoading } = useClientsQuery(
    `name=${searchClient}&isActive=${activeStatus}`,
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const [tableData, setTableData] = useState(null)
  const [deleteClient] = useDeleteClientMutation()

  useEffect(() => {
    setTableData(clients)
  }, [clients])

  if (isLoading || !tableData) {
    return <div>Loading...</div>
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client? ')) {
      await deleteClient(id)
      toast.success('User Deleted Successfully')
    }
  }

  return <TableInstance tableData={tableData} handleDelete={handleDelete} />
}

const TableInstance = ({ tableData, handleDelete }) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        width: 90,
        minWidth: 90,
        maxWidth: 90,
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        width: 40,
        minWidth: 40,
        maxWidth: 40,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        width: 40,
        minWidth: 40,
        maxWidth: 40,
      },
      {
        Header: 'Active?',
        accessor: 'isActive',
        Cell: ({ value }) => (
          <div style={{ textAlign: 'center' }}>
            {value ? (
              <FaCheck style={{ color: 'green' }} />
            ) : (
              <FaTimes style={{ color: 'red' }} />
            )}
          </div>
        ),
        width: 30,
        minWidth: 30,
        maxWidth: 30,
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
        minWidth: 30,
        width: 30,
        maxWidth: 30,
        align: 'center',
        Cell: ({ row }) => (
          <div style={{ textAlign: 'center' }}>
            <Link to={`/client/${row.original._id}`}>
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
        sortBy: [{ id: 'name', desc: false }],
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
