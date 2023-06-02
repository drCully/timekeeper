import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { v } from './variables'

export const SForm = styled.form`
  width: 100%;
  min-width: ${({ minwidth }) => minwidth || '0'};
  background: ${({ theme }) => theme.bg};
  border-radius: ${v.borderRadius};
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  padding: ${v.mdSpacing};
`
export const SFormPlain = styled.form`
  width: 100%;
  min-width: ${({ minwidth }) => minwidth || '0'};
  background: ${({ theme }) => theme.bg};
  padding: ${v.mdSpacing};
`

export const SFormTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`

export const SFormControl = styled.div`
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin || '0'};

  :first-of-type {
    margin-top: ${v.mdSpacing};
  }
  :not(:last-of-type) {
    margin-bottom: ${v.smSpacing};
  }
`

export const SLabel = styled.label`
  display: inline-block;
  font-size: 1em;
  font-weight: 600;
  margin: ${({ margin }) => margin || '0 .75rem'};
  margin-bottom: calc(${v.smSpacing} / 4);
`

export const SInput = styled.input`
  outline: none;
  border: 1px solid ${({ theme }) => theme.textFade};
  width: ${({ width }) => width || '20%'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${v.smSpacing};
  font-family: inherit;
  font-size: 1em;
  border-radius: ${v.borderRadius};
`

export const SSelect = styled.select`
  outline: none;
  border: 1px solid ${({ theme }) => theme.textFade};
  width: ${({ width }) => width || '20%'};
  padding: ${v.smSpacing};
  font-size: 1em;
  border-radius: ${v.borderRadius};
`

export const STextArea = styled.textarea`
  width: ${({ width }) => width || '95%'};
  height: 6em;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
  margin: ${({ margin }) => margin || '1rem'};
  margin-bottom: calc(${v.smSpacing} / 4);
  padding: ${v.smSpacing};
  border: 1px solid ${({ theme }) => theme.textFade};
  border-radius: ${v.borderRadius};
  outline: none;
`

export const SRedirect = styled.div`
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${v.smSpacing};
`
export const SRedirectLabel = styled.span`
  color: ${({ theme }) => theme.text2};
`

export const SRedirectLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
`
