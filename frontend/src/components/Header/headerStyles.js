import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { v, b } from '../../styles/variables';

import { HiMenuAlt3 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';

const btnReset = css`
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  color: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  font-size: inherit;
  padding: 0;
`;

export const SHeaderHeight = styled.div`
  height: ${v.headerHeight};
`;

export const SHeaderFixed = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: ${v.headerHeight};
  background: ${({ theme }) => theme.bg};
  z-index: 10;
`;

export const SHeader = styled.header`
  margin: 0 auto;
  height: 100%;
  max-width: 1920px;
  display: flex;
  align-items: center;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  transition: 0.3s ease padding;
  padding: 0 ${v.mdSpacing};
  @media ${b.lg} {
    padding: 0 ${v.lgSpacing};
  }

  > div {
    flex: 1;
  }
`;

export const SLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const SCenter = styled.div`
  height: 100%;
  align-items: center;
  justify-content: center;

  display: none;
  @media ${b.md} {
    display: flex;
  }
`;
export const SRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

// Left
export const SLogoLink = styled(Link)`
  display: flex;
  width: 30px;
  color: inherit;
  text-decoration: none;
`;

export const SLogo = styled.img`
  max-width: 30px;
  height: 30px;
`;

export const SBrand = styled.span`
  margin-left: 10px;
  font-size: 20px;
`;

// Center
// nav

// Right
export const SCTAButton = styled(Link)`
  ${btnReset}
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.textInvert};
  padding: calc(${v.smSpacing} - 2px) ${v.lgSpacing};
  border-radius: ${v.borderRadius};
  text-decoration: none;
  opacity: 0.9;

  &:hover {
    opacity: 1;
    transform: scale(0.98);
  }

  @media ${b.md} {
    display: initial;
  }
`;

export const SMenuToggleButton = styled.button`
  ${btnReset}
  width: 32px;
  position: relative;
  z-index: 100;

  @media ${b.md} {
    display: none;
  }
`;

const iconStyles = css`
  display: block;
  width: 100%;
  height: 100%;
`;
export const SMenuIcon = styled(HiMenuAlt3)`
  ${iconStyles}
`;
export const SCloseIcon = styled(IoMdClose)`
  ${iconStyles}
`;

// Menu
export const SMenu = styled.div`
  position: fixed;
  top: ${v.headerHeight};
  left: 100%;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.overlay};

  width: 100%;
  height: calc(100% - ${v.headerHeight});
  transition: 0.3s ease left;
  padding: ${v.lgSpacing};

  @media ${b.md} {
    display: none;
  }
`;
