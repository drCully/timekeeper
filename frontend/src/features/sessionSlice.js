import { createSlice } from '@reduxjs/toolkit';
import { subDays, addDays, format, parseISO } from 'date-fns';

const initialState = {
  timesheetDate: format(new Date(), 'yyyy-MM-dd'),
  lastClient: '',
  lastTask: '',
};

const sessionSlice = createSlice({
  name: 'sesson',
  initialState,
  reducers: {
    setTimesheetDate: (state, action) => {
      state.timesheetDate = action.payload;
    },
    previousDate: (state) => {
      state.timesheetDate = format(
        subDays(parseISO(state.timesheetDate), 1),
        'yyyy-MM-dd'
      );
    },
    nextDate: (state) => {
      state.timesheetDate = format(
        addDays(parseISO(state.timesheetDate), 1),
        'yyyy-MM-dd'
      );
    },
    setLastClient: (state, action) => {
      state.lastClient = action.payload;
    },
    setLastTask: (state, action) => {
      state.lastTask = action.payload;
    },
  },
});

export const {
  setTimesheetDate,
  previousDate,
  nextDate,
  setLastClient,
  setLastTask,
} = sessionSlice.actions;
export default sessionSlice.reducer;
