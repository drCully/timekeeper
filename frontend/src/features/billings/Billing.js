import { s } from '../../styles/variables'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import { SCardFull } from '../../styles/cardStyles'
import BillableList from './BillableList'
import BilledList from './BilledList'

const Billing = () => {
  return (
    <SFixedContainer maxwidth={`${s.xl}`}>
      <h2>Billing</h2>
      <SFlexContainer>
        <SCardFull>
          <BillableList />
        </SCardFull>
        <SCardFull>
          <BilledList />
        </SCardFull>
      </SFlexContainer>
    </SFixedContainer>
  )
}

export default Billing
