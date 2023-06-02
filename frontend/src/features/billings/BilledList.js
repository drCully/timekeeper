import { s } from '../../styles/variables'
import { SFixedContainer } from '../../styles/containerStyles'

import { BilledListDetail } from './BilledListDetail'

const BilledList = () => {
  return (
    <SFixedContainer maxwidth={`${s.md}`}>
      <h3>Billed</h3>
      <BilledListDetail />
    </SFixedContainer>
  )
}

export default BilledList
