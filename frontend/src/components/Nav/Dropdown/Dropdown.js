import MenuItems from '../MenuItems'
import { SDropdown } from './dropdownStyles'

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1

  return (
    <SDropdown isOpen={dropdown} multilevel={depthLevel}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} />
      ))}
    </SDropdown>
  )
}

export default Dropdown
