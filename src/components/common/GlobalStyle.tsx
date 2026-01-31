import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Playfair+Display:wght@700&display=swap');
  html, body, #root {
    min-height: 100%;
    background: #fff;
    color: #003d82;
    font-family: 'Montserrat', Arial, sans-serif;
    scroll-behavior: smooth;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
