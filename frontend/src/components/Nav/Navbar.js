import MenuItems from './MenuItems'
import { SNav } from '../../styles/navStyles'

const Navbar = ({ navLinks }) => {
  return (
    <SNav>
      {navLinks.map((menu, index) => {
        const depthLevel = 0
        return <MenuItems items={menu} key={index} depthLevel={depthLevel} />
      })}
    </SNav>
  )
}

Navbar.defaultProps = {
  navLinks: [
    {
      label: 'Time',
      link: '/timesheets',
      submenu: null,
    },
    {
      label: 'Billing',
      link: '/billings',
      submenu: null,
    },
    {
      label: 'Maintenance',
      link: null,
      submenu: [
        {
          label: 'Clients',
          link: '/clients',
        },
        {
          label: 'Tasks',
          link: '/tasks',
        },
        {
          label: 'Users',
          link: '/users',
        },
      ],
    },
  ],
}
export default Navbar
