import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box;
        margin: 0;
    }
    body {
        background: ${({ theme }) => theme.bg2};
        color: ${({ theme }) => theme.text};
        font-family: 'Roboto', sans-serif;
        letter-spacing: .6px;
        font-size: 1em;
        margin: 0;
        padding: 0;
    }
    p {
        opacity: 0.6;
        line-height: 1.5;
    }
    h2 {color: ${({ theme }) => theme.primary};}
 
    .ag-cell-wrap-text {
      word-break: break-word;
    }

    .ag-theme-alpine {
         --ag-selected-row-background-color: rgb(255, 255, 255);     
    }
     
    table {
        border-collapse: collapse;
        width: 100%;
        margin-top: 1rem;
      }
      
      table td,
      table th {
  
        padding: 6px;
        white-space: nowrap;
        overflow-y: auto;
        overflow-x: hidden;
        text-overflow: ellipsis;
      }
      
      table tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      
      table tr:hover {
        background-color: #ddd;
      }
      
      table th {
        border-bottom: 1px solid;
        text-align: center;
        opacity: 0.6;
  
      }
`
