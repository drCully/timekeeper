import styled from 'styled-components'

import { v, b } from '../../../styles/variables'

export const SDropdown = styled.div`
  position: absolute;
  top: ${({ multilevel }) => (!multilevel ? '-8px' : v.headerHeight)};
  right: 0;
  left: ${({ multilevel }) => (!multilevel ? '104%' : 'auto')};
  white-space: nowrap;
  padding: ${v.smSpacing};
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.08),
    0 4px 6px -2px rgba(71, 63, 79, 0.16);
  display: ${({ isOpen }) => (!isOpen ? 'none' : 'display')};

  @media ${b.md} {
    min-width: 120%;
    position: absolute;
  }
`

export const STreeItem = styled.div`
  text-align: left;
  padding: ${v.smSpacing};
`

export const STreeChild = styled.div`
  margin-top: ${v.smSpacing};
  background: rgba(255, 255, 255, 0.2);
`
