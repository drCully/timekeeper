import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { v } from './variables';

export const SPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active', // default to "disabled"
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: ${({ padding }) => padding || '0'};

  li a {
    border-radius: ${v.borderRadius};
    padding: ${v.smSpacing} 1em;
    margin: 0.15rem;
    border: 1px solid ${({ theme }) => theme.textFade};
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.primary};
      opacity: 0.98;
      transform: scale(0.98);
      color: ${({ theme }) => theme.textInvert};
    }
  }

  li.active a {
    background-color: ${({ theme }) => theme.primary};
    opacity: 0.9;
    border-color: transparent;
    color: white;
    min-width: 32px;
    &:hover {
      opacity: 1;
      transform: scale(0.98);
    }
  }

  li.disabled a {
    color: ${({ theme }) => theme.textInvert};
    background-color: ${({ theme }) => theme.textFade};
    opacity: 0.8;
  }

  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
