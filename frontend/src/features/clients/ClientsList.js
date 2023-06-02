import { useState } from 'react'
import { SButtonLink } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import { SInput, SSelect } from '../../styles/formStyles'
import { ClientsListDetail } from './ClientsListDetail'

const ClientsList = () => {
  const [activeStatus, setActiveStatus] = useState(true)
  const onChangeActiveStatus = (event) => {
    const activeStatus = event.target.value
    setActiveStatus(activeStatus)
  }

  const [searchClient, setSearchClient] = useState('')
  const onChangeSearchClient = (event) => {
    const searchClient = event.target.value
    setSearchClient(searchClient)
  }

  return (
    <SFixedContainer maxwidth={`${s.md}`}>
      <h2>Clients</h2>
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
          placeholder='Search by name'
          value={searchClient}
          onChange={onChangeSearchClient}
          width={'20rem'}
          margin={'0 1em'}
        />
        <SButtonLink to={'/client'}>Add New</SButtonLink>
      </SFlexContainer>
      <ClientsListDetail
        searchClient={searchClient}
        activeStatus={activeStatus}
      />
    </SFixedContainer>
  )
}

export default ClientsList
