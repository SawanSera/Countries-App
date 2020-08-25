import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 1s linear;
  }
  .card {
    background-color: ${({ theme }) => theme.card};
    color: ${({theme}) => theme.text};
  }
  .btn {
    background-color: ${({ theme }) => theme.buttoncolour};
  }
  .dropdown-content {
    background-color: ${({ theme }) => theme.card};
  }
  .category-individual {
    z-index: 1500;
    color: ${({theme}) => theme.text} !important;
  }

  `
  