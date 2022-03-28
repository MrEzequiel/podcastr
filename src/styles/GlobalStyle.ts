import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }

    @media (max-width: 728px) {
      font-size: 87.5%; // 14px
    }
  }

  body {
    background: ${props => props.theme.colors.gray50};
    color: #333;
  }

  body, input, button, textarea {
    font: 500 1rem ${props => props.theme.font.body};
    color: ${props => props.theme.colors.gray800};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.font.heading};
    font-weight: 600;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
  }
`
