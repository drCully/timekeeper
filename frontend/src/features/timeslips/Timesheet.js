import { useSelector, useDispatch } from 'react-redux'
import { SButtonLink } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import { SInput } from '../../styles/formStyles'
import {
  FaFileAlt,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from 'react-icons/fa'

import { TimesheetDetail } from './TimesheetDetail'

import { setTimesheetDate, previousDate, nextDate } from '../sessionSlice'

const Timesheet = () => {
  const { timesheetDate } = useSelector((state) => state.session)
  const dispatch = useDispatch()

  const handleDateChange = (e) => {
    dispatch(setTimesheetDate(e.target.value))
  }

  return (
    <SFixedContainer maxwidth={`${s.xxl}`}>
      <h2>Timesheet</h2>
      <SFlexContainer>
        <FaChevronCircleLeft
          type='button'
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '3px 10px 0 0',
            color: '#888888',
            fontSize: 30,
            marginRight: 10,
            cursor: 'pointer',
          }}
          onClick={() => dispatch(previousDate())}
        />
        <SInput
          type='date'
          id='timesheetDate'
          name='timesheetDate'
          value={timesheetDate}
          onChange={handleDateChange}
          width={'12rem'}
          height={'2.5rem'}
          style={{ fontFamily: 'Roboto' }}
        />

        <FaChevronCircleRight
          type='button'
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            margin: '3px 10px 10px',
            color: '#888888',
            fontSize: 30,
            cursor: 'pointer',
          }}
          onClick={() => dispatch(nextDate())}
        />
        <SButtonLink to={'/timeslip'} style={{ margin: '0 15px 15px' }}>
          Add New
        </SButtonLink>
        <FaFileAlt
          type='button'
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignContent: 'center',
            color: 'green',
            fontSize: 30,
            margin: '3px 10px 10px',
          }}
        />
      </SFlexContainer>
      <TimesheetDetail />
    </SFixedContainer>
  )
}

export default Timesheet
