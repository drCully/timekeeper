import { useState } from 'react'
import { SButtonLink } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import { SInput, SSelect } from '../../styles/formStyles'
import { UsersListDetail } from './UsersListDetail'

const UsersList = () => {
  const [activeStatus, setActiveStatus] = useState(true)
  const onChangeActiveStatus = (event) => {
    const activeStatus = event.target.value
    setActiveStatus(activeStatus)
  }

  const [searchUser, setSearchUser] = useState('')
  const onChangeSearchUser = (event) => {
    const searchUser = event.target.value
    setSearchUser(searchUser)
  }

  return (
    <SFixedContainer maxwidth={`${s.md}`}>
      <h2>Users</h2>
      <SFlexContainer>
        <SSelect
          onChange={(event) => {
            onChangeActiveStatus(event)
          }}
          width='10rem'
        >
          <option value='true'>Show Active</option>
          <option value='false'>Show Closed</option>
          <option value=''>Show All</option>
        </SSelect>
        <SInput
          type='search'
          className='form-control'
          placeholder='Search by last name'
          value={searchUser}
          onChange={onChangeSearchUser}
          width={'20rem'}
          margin={'0 1em'}
        ></SInput>
        <SButtonLink to={'/users/add'}>Add New</SButtonLink>
      </SFlexContainer>
      <UsersListDetail searchUser={searchUser} activeStatus={activeStatus} />
    </SFixedContainer>
  )
}

export default UsersList
