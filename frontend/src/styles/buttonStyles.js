import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const SButton = styled.button`
  width: ${({ width }) => (width ? width : '')};
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  opacity: 0.9;
  background-color: ${({ background }) =>
    !background ? '#FF6A00' : `${background}`};
  color: ${({ color }) => color || '#fff'};

  &:hover {
    opacity: 1;
    transform: scale(0.98);
    color: #fff;
  }
`

export const SButtonLink = styled(Link)`
  display: inline-block;
  width: ${({ width }) => (width ? width : '')};
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  opacity: 0.9;
  background-color: ${({ background }) =>
    !background ? '#FF6A00' : `${background}`};
  color: ${({ color }) => color || '#fff'};

  &:hover {
    opacity: 1;
    transform: scale(0.98);
    color: #fff;
  }
`

export const SLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  opacity: 0.9;

  &:hover {
    opacity: 1;
    transform: scale(0.98);
  }
`
