import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { SButton } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'
import {
  SFixedContainer,
  SFlexContainer,
  SFlexCol,
} from '../../styles/containerStyles'
import { SInput, SSelect } from '../../styles/formStyles'
import { ProfileHoursDetail } from './ProfileHoursDetail'

const ProfileHours = () => {
  const { userId, userName } = useAuth()
  const navigate = useNavigate()

  const [billedStatus, setBilledStatus] = useState('')
  const onChangeBilledStatus = (event) => {
    const billedStatus = event.target.value
    setBilledStatus(billedStatus)
  }

  const [searchDescription, setSearchDescription] = useState('')
  const onChangeSearchDescription = (event) => {
    const searchDescription = event.target.value
    setSearchDescription(searchDescription)
  }

  const handleNewTimeslip = () => {
    navigate('/timeslip')
  }

  return (
    <SFixedContainer maxwidth={`${s.xxl}`}>
      <SFlexContainer margin='1rem 0 0 0'>
        <SFlexCol fsize='1'>
          <h2>Timeslips</h2>
          <h4>{userName}</h4>
        </SFlexCol>
        <SSelect
          onChange={(event) => {
            onChangeBilledStatus(event)
          }}
          width='10rem'
        >
          <option value=''>Show All</option>
          <option value='false'>Show Unbilled</option>
          <option value='true'>Show Billed</option>
        </SSelect>
        <SInput
          type='search'
          className='form-control'
          placeholder='Search in description'
          value={searchDescription}
          onChange={onChangeSearchDescription}
          width={'20rem'}
          margin={'0 1em'}
        />
        <SButton onClick={handleNewTimeslip}>Add New</SButton>
        <SButton
          background='gray'
          type='button'
          margin='0 .5rem '
          onClick={(e) => {
            navigate(-1)
          }}
        >
          Go Back
        </SButton>
      </SFlexContainer>
      <ProfileHoursDetail
        userId={userId}
        billedStatus={billedStatus}
        searchDescription={searchDescription}
      />
    </SFixedContainer>
  )
}

export default ProfileHours
