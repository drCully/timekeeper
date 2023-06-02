import { useState, useRef, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addHours, format, parseISO } from 'date-fns'
import { toast } from 'react-toastify'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import { useDeleteTimeslipMutation } from '../timeslips/timeslipsApiSlice'
import {
  setItems,
  setTimeAmount,
  setSelectedItems,
} from '../../features/billings/billingSlice'

const numberFormatter = (params) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
  }).format(params.value)
}

export function InvoiceCreateDetail() {
  const dispatch = useDispatch()

  const { items, selectedItems } = useSelector((state) => state.billing)
  const [deleteTimeslip] = useDeleteTimeslipMutation()

  const gridRef = useRef()
  const [rowData, setRowData] = useState()
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Date',
      field: 'date',
      valueFormatter: (params) => {
        return format(addHours(parseISO(params.value), 8), 'MM/dd/yyyy')
      },
      minWidth: 145,
      sortable: true,
      sort: 'asc',
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    { field: 'description', flex: 4, wrapText: true, autoHeight: true },
    {
      field: 'hours',
      valueFormatter: numberFormatter,
      maxWidth: 90,
      type: 'rightAligned',
    },
    {
      field: 'rate',
      valueFormatter: numberFormatter,
      type: 'rightAligned',
      maxWidth: 90,
    },
    { headerName: 'Service', field: 'task.name', minWidth: 130 },
    {
      field: 'amount',
      valueGetter: (params) => {
        return params.data.hours * params.data.rate
      },

      valueFormatter: numberFormatter,
      type: 'rightAligned',
      maxWidth: 120,
    },
    {
      headerName: 'Actions',
      field: 'id',
      cellRendererFramework: (params) => (
        <div>
          <Link to={`/timeslip/${params.data._id}`}>
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
            onClick={() => handleDelete(params.data._id)}
          />
        </div>
      ),
      type: 'rightAligned',
      maxWidth: 100,
    },
  ])
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    }
  }, [])

  const onGridReady = useCallback((params) => {
    setRowData(items)
  }, [])

  const onFirstDataRendered = useCallback((params) => {
    if (selectedItems === null) {
      // first rendering
      gridRef.current.api.selectAll(true)
    } else {
      //refresh keeping selected items
      const refreshSelected = selectedItems
      gridRef.current.api.deselectAll(true)
      gridRef.current.api.forEachNode((node) =>
        refreshSelected.map((item) => {
          if (item._id === node.data._id) {
            node.setSelected(true)
          }
        })
      )
    }
  }, [])

  const onSelectionChanged = useCallback((event) => {
    const selectedRows = event.api.getSelectedRows()
    dispatch(setSelectedItems(selectedRows))

    const timeAmount = selectedRows.reduce((acc, item) => acc + item.total, 0)
    dispatch(setTimeAmount(timeAmount))
  }, [])

  const handleDelete = async (id) => {
    /*     if (window.confirm('Are you sure you want to delete this time record? ')) {
      await deleteTimeslip(id)
      toast.success('Time Record Deleted Successfully')
    } */
  }

  return (
    <div className='ag-theme-alpine' style={{ height: 500 }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={'multiple'}
        rowMultiSelectWithClick={true}
        onGridReady={onGridReady}
        onFirstDataRendered={onFirstDataRendered}
        onSelectionChanged={onSelectionChanged}
      ></AgGridReact>
    </div>
  )
}
