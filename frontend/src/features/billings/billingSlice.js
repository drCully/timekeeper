import { createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'

const initialState = {
  asOfDate: format(new Date(), 'yyyy-MM-dd'),
  clientId: null,
  items: [],
  selectedItems: null,
  timeAmount: 0,
  hours: 0,
}

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setAsOfDate: (state, action) => {
      state.asOfDate = action.payload
    },
    setClientId: (state, action) => {
      state.clientId = action.payload
    },
    setItems: (state, action) => {
      state.items = action.payload
    },
    setSelectedItems: (state, action) => {
      state.selectedItems = action.payload
    },
    setTimeAmount: (state, action) => {
      state.timeAmount = action.payload
    },
    setHours: (state, action) => {
      state.hours = action.payload
    },
    clearBilling: (state, action) => {
      state.asOfDate = format(new Date(), 'yyyy-MM-dd')
      state.clientId = null
      state.items = []
      state.selectedItems = null
      state.timeAmount = 0
      state.hours = 0
    },
  },
})

export const {
  setAsOfDate,
  setClientId,
  setItems,
  setSelectedItems,
  setTimeAmount,
  setHours,
  clearBilling,
} = billingSlice.actions
export default billingSlice.reducer
