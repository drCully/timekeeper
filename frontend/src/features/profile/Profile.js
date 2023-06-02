import { useNavigate } from 'react-router-dom'
import { s } from '../../styles/variables'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import User from './ProfileUser'
import { SButton, SButtonLink } from '../../styles/buttonStyles'

const Profile = () => {
  const navigate = useNavigate()

  return (
    <SFixedContainer maxwidth={`${s.lg}`}>
      <SFlexContainer style={{ gap: '2rem' }}>
        <User />
        <SFixedContainer maxwidth='10rem'>
          <SButtonLink width='100%' margin='1rem' to={`/profilehours`}>
            Time
          </SButtonLink>

          <SButtonLink width='100%' margin='1rem' to={``}>
            Expenses
          </SButtonLink>

          <SButton
            width='100%'
            margin='1rem'
            background='gray'
            onClick={() => {
              navigate(-1)
            }}
          >
            Go Back
          </SButton>
        </SFixedContainer>
      </SFlexContainer>
    </SFixedContainer>
  )
}

export default Profile
