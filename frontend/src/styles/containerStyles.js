import styled from 'styled-components'
import { v, s } from './variables'

export const SPageContainer = styled.main`
  transition: 0.3s ease padding;
  display: flex;
  flex-direction: ${({ layout }) => layout || 'column'};
  align-items: center;
  margin: ${v.lgSpacing};
  padding: ${v.lgSpacing};
  min-height: calc(100vh - ${v.headerHeight} - (${v.lgSpacing}*2));
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
`
export const SFlexContainer = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify || 'end'};
  align-items: ${({ align }) => align || 'center'};
  margin: ${({ margin }) => margin || '0'};
`
export const SFixedContainer = styled.div`
  max-width: ${({ maxwidth }) => (!maxwidth ? `${s.xxl}` : `${maxwidth}`)};
  min-width: ${({ minwidth }) => minwidth || '0'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '0'};
  overflow: ${({ overflow }) => overflow || 'visible'};
  margin: ${({ margin }) => margin || '0 auto'};
`
export const SFlexRow = styled.div`
  display: flex;
`
export const SFlexCol = styled.div`
  flex: ${({ fsize }) => fsize || ''};
  justify-content: ${({ justify }) => justify || 'end'};
  align-items: ${({ align }) => align || 'center'};
  margin: ${({ margin }) => margin || '0'};
`
