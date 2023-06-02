import { useState } from 'react'
import { SButtonLink } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import { SInput, SSelect } from '../../styles/formStyles'
import { TimeslipsListDetail } from './TimeslipsListDetail'

const TimeslipsList = () => {
  const [billedStatus, setBilledStatus] = useState(false)
  const onChangeBilledStatus = (event) => {
    const billedStatus = event.target.value
    setBilledStatus(billedStatus)
  }

  const [searchBilling, setSearchBilling] = useState('')
  const onChangeSearchBilling = (event) => {
    const searchBilling = event.target.value
    setSearchBilling(searchBilling)
  }

  return (
    <SFixedContainer maxwidth={`${s.lg}`}>
      <h2>Timeslips</h2>
      <SFlexContainer>
        <SSelect
          onChange={(event) => {
            onChangeBilledStatus(event)
          }}
          width='10rem'
        >
          <option value='false'>Show Unbilled</option>
          <option value='true'>Show Billed</option>
          <option value=''>Show All</option>
        </SSelect>
        <SInput
          type='search'
          className='form-control'
          placeholder='Search description'
          value={searchBilling}
          onChange={onChangeSearchBilling}
          width={'20rem'}
          margin={'0 1em'}
        />
        <SButtonLink to={'/billing'}>Add New</SButtonLink>
      </SFlexContainer>
      <TimeslipsListDetail
        searchBilling={searchBilling}
        billedStatus={billedStatus}
      />
    </SFixedContainer>
  )
}

export default TimeslipsList
