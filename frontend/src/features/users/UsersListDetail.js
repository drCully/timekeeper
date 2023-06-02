import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaRegEdit, FaRegTrashAlt, FaCheck, FaTimes } from 'react-icons/fa'
import {
  useTable,
  useFlexLayout,
  usePagination,
  useRowSelect,
  useSortBy,
} from 'react-table'
import { TableLayout } from '../../components/TableLayout'
import { useUsersQuery, useDeleteUserMutation } from './usersApiSlice'

export function UsersListDetail({ searchUser, activeStatus }) {
  const { data: users, isLoading } = useUsersQuery(
    `lastName=${searchUser}&isActive=${activeStatus}`,
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const [tableData, setTableData] = useState(null)
  const [deleteUser] = useDeleteUserMutation()

  useEffect(() => {
    setTableData(users)
  }, [users])

  if (isLoading || !tableData) {
    return <div>Loading...</div>
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? ')) {
      await deleteUser(id)
      toast.success('User Deleted Successfully')
    }
  }

  return <TableInstance tableData={tableData} handleDelete={handleDelete} />
}

const TableInstance = ({ tableData, handleDelete }) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: 'Email',
        accessor: 'email',
        width: 60,
        minWidth: 60,
        maxWidth: 60,
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        width: 30,
        minWidth: 30,
        maxWidth: 30,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        width: 30,
        minWidth: 30,
        maxWidth: 30,
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
        minWidth: 25,
        width: 25,
        maxWidth: 30,
        align: 'center',
        Cell: ({ row }) => (
          <div style={{ textAlign: 'center' }}>
            <Link to={`/users/${row.original._id}`}>
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
        sortBy: [{ id: 'lastName', desc: false }],
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
