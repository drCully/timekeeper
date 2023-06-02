import styled from 'styled-components'
import { v, s } from './variables'

export const SCard = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: ${v.mdSpacing};
`

export const SCardFull = styled.div`
  display: flex;
  flex-direction: ${({ layout }) => layout || 'column'};
  align-items: center;
  margin: ${v.mdSpacing};
  padding: ${v.mdSpacing};
  width: ${({ width }) => width || '100%'};
  max-width: ${({ maxwidth }) => (!maxwidth ? `${s.xxl}` : `${maxwidth}`)};
  height: ${({ height }) => height || '0'};
  min-height: calc(100vh - ${v.headerHeight} - (${v.mdSpacing}*12));
  overflow: ${({ overflow }) => overflow || 'visible'};
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
`
