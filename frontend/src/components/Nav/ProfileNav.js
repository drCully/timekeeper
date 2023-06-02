import { useState, useEffect, useRef } from 'react'
import useAuth from '../../hooks/useAuth'
import { useSendSignoutMutation } from '../../features/auth/authApiSlice'
import {
  SArrowContainer,
  SArrowIcon,
  SNavLabelContainer,
  SNav,
  SNavLink,
  SNavLinkContainer,
  SProfile,
  SProfileDropdown,
  SProfileLink,
} from '../../styles/navStyles'
import { FaUser } from 'react-icons/fa'

const ProfileNav = ({ navLinks }) => {
  const { userName } = useAuth()
  const [dropdown, setDropdown] = useState(false)
  const [sendSignout] = useSendSignoutMutation()
  let ref = useRef()

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [dropdown])

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true)
  }

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false)
  }

  return (
    <SNav>
      <SProfile
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <SNavLabelContainer
          role='button'
          to={'/'}
          aria-expanded={dropdown ? 'true' : 'false'}
          onClick={() => setDropdown((prev) => !prev)}
        >
          <FaUser style={{ marginRight: '4px' }} /> {userName}
          <SArrowContainer isOpen={dropdown}>
            <SArrowIcon />
          </SArrowContainer>
        </SNavLabelContainer>
        <SProfileDropdown isOpen={dropdown}>
          {navLinks.map((items, index) => (
            <SNavLinkContainer key={index}>
              <SNavLink to={items.link}>{items.label}</SNavLink>
            </SNavLinkContainer>
          ))}
          <SProfileLink onClick={sendSignout}>Sign Out</SProfileLink>
        </SProfileDropdown>
      </SProfile>
    </SNav>
  )
}

ProfileNav.defaultProps = {
  navLinks: [
    {
      label: 'Profile',
      link: '/profile',
    },
  ],
}

export default ProfileNav
