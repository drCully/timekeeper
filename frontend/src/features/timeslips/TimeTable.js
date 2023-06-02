import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import {
  useTable,
  useFlexLayout,
  usePagination,
  useRowSelect,
  useSortBy,
} from 'react-table';
import { TableLayout } from '../../components/TableLayout';
import {
  useTimesQuery,
  useDeleteTimeMutation,
} from '../../app/services/timekeeperApi';

export function TimeTable() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const timekeeper = currentUser.id;
  const { timesheetDate } = useSelector((state) => state.session);

  const { data: timeRecords, isLoading } = useTimesQuery(
    `size=9999&date=${timesheetDate}&timekeeper=${timekeeper}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [tableData, setTableData] = useState(null);
  const [deleteTime] = useDeleteTimeMutation();

  useEffect(() => {
    setTableData(timeRecords?.data);
  }, [timeRecords]);

  if (isLoading || !tableData) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this time record? ')) {
      await deleteTime(id);
      toast.success('Time Record Deleted Successfully');
    }
  };

  return <TableInstance tableData={tableData} handleDelete={handleDelete} />;
}

const TableInstance = ({ tableData, handleDelete }) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: 'Client',
        accessor: 'client.clientname',
        width: 70,
        minWidth: 70,
        maxWidth: 70,
      },
      {
        Header: 'Task',
        accessor: 'task.taskname',
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
    ];
    return [columns, tableData];
  }, [tableData]);

  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
      align: 'center',
    }),
    []
  );

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
            <Link to={`/timeedit/${row.original._id}`}>
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
    ]);
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFlexLayout,
    useSortBy,
    usePagination,
    useRowSelect,
    actionColumn
  );

  return <TableLayout {...tableInstance} />;
};
