import styled from 'styled-components'

export const STableWrap = styled.div`
  table {
    font-size: 0.95rem;
  }

  table td,
  table th {
    white-space: normal;
  }
`
export const STablePrint = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.75rem;
  }

  table thead {
    background: ${({ theme }) => theme.bg};
    position: sticky;
    top: 0px;
    margin: 0 0 0 0;
  }

  table td,
  table th {
    padding: 6px;
    white-space: normal; // nowrap
    overflow-y: auto;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  table tr:nth-child(even) {
    background-color: ${({ theme }) => theme.bg};
  }

  table tr:hover {
    background-color: ${({ theme }) => theme.bg};
  }

  table th {
    border-bottom: 1px solid;
    text-align: center;
    opacity: 0.6;
  }
`
