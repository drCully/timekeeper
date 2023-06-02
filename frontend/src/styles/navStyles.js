import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { v, b } from './variables'
import { IoMdArrowDropdown } from 'react-icons/io'

export const SNav = styled.nav`
  width: auto;
  padding: ${v.mdSpacing};
  background: ${({ theme }) => theme.bg};
  border-radius: ${v.borderRadius};

  @media ${b.md} {
    background: none;
    padding: 0;
    height: 100%;
    display: flex;
  }
`
export const SNavLinkContainer = styled.div`
  user-select: none;
  position: relative;
  width: 100%;
  justify-content: space-between;

  :not(:last-of-type) {
    margin-bottom: ${v.mdSpacing};
  }

  @media ${b.md} {
    display: flex;
    align-items: center;
    :not(:last-of-type) {
      margin-bottom: 0;
    }
  }
`
export const SNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  padding: 0.7rem 1rem;

  &.active {
    color: #eb6f16;
    font-weight: 500;

    &:hover {
      color: #ff6a00;
    }
  }

  &:hover {
    color: #959faa;
  }
`
export const SNavLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  padding: 0.7rem 1rem;

  &.active {
    color: #959faa;
    font-weight: 500;
  }

  &:hover {
    color: #959faa;
  }
`
export const SNavLabel = styled.span`
  color: ${({ isOpen, theme }) => (!isOpen ? 'inherit' : theme.primary)};
  margin-left: 3px;
`
export const SArrowContainer = styled.div`
  svg {
    transform: ${({ isOpen }) => (!isOpen ? 'rotate(-90deg)' : 'none')};
  }
`
export const SArrowIcon = styled(IoMdArrowDropdown)`
  display: block;
  margin-left: 4px;
`
export const SProfile = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  color: ${({ theme }) => theme.primary};
`
export const SProfileDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  left: auto;
  white-space: nowrap;
  padding: ${v.smSpacing};
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.08),
    0 4px 6px -2px rgba(71, 63, 79, 0.16);
  display: ${({ isOpen }) => (!isOpen ? 'none' : 'display')};
  color: ${({ theme }) => theme.text};

  @media ${b.md} {
    min-width: 120%;
    position: absolute;
  }
`
export const SProfileLink = styled.div`
  cursor: pointer;
  padding: 0.7rem 1rem;

  &.active {
    color: #959faa;
    font-weight: 500;
  }

  &:hover {
    color: #959faa;
  }
`
