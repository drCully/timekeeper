import { useSelector, useDispatch } from 'react-redux'
import { s } from '../../styles/variables'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import { SLabel, SInput } from '../../styles/formStyles'

import { BillableListDetail } from './BillableListDetail'
import { setAsOfDate } from './billingSlice'

const BillableList = () => {
  const { asOfDate } = useSelector((state) => state.billing)
  const dispatch = useDispatch()

  const handleDateChange = (e) => {
    dispatch(setAsOfDate(e.target.value))
  }

  return (
    <SFixedContainer maxwidth={`${s.md}`}>
      <h3>Billable</h3>
      <SFlexContainer>
        <SLabel margin={'0 .75em 0 2em'}>As of </SLabel>
        <SInput
          type='Date'
          id='asOfDate'
          name='asOfDate'
          value={asOfDate}
          onChange={handleDateChange}
          width={'12rem'}
          style={{ fontFamily: 'Roboto' }}
        />
      </SFlexContainer>
      <BillableListDetail />
    </SFixedContainer>
  )
}

export default BillableList
