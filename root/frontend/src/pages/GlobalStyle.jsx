import { createGlobalStyle } from 'styled-components';

const GlobalTheme = {
    colors: {
      "primary": "#ffffff",
      "secondary": "#dcdcee",
      "secondary_dark": "#9e9ed0",
      "tertiary": "#8493fe",
      "tertiary_dark": "#5066fe",
      "tertiary_focus": "#1e3afd",
      "background": "#eeeeee",
      "outline": "#2f336d"
    },
  };

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  scroll-behavior: smooth; 
}

html {
  margin-right: calc(0px - calc(100vw - 100%));  // prevent scroll bar position offset
}

body {
  height:100%;
  width: 100%;
  background: linear-gradient(to bottom right, ${GlobalTheme.colors.tertiary}, ${GlobalTheme.colors.secondary} 50%);
  background-attachment: fixed;
  font-family: 'Roboto', 'sans-serif';
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  color: #000000;

  &:hover {
    color: ${GlobalTheme.colors.tertiary_focus} !important;
  }

  &:visited {
    color: #000000;
  }

}

img {
  width: 100%;
  height: auto;
}

h1, h2, h3 {

  font-weight: normal;
  margin: 1rem 0; 

  @media screen and (max-width: 450px) {
    margin: 0.5rem 0;
  }

}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

input[type=text], input[type=date] {
  border: none;
  outline: none;
  color: black;
  font-style: normal;
  font-size: 1rem;
}

input[type=text]::placeholder {
  color: grey;
  font-size: 0.9rem;
}

input[type=date] {
  font-family: 'Roboto', 'sans-serif';
  font-style: italic;
}

input:autofill {
  background-color: ${GlobalTheme.colors.secondary};
  border: none;
  outline: none;
}

/* attempt to override autofill highlight; not functioning curently*/
input[type=text]:-internal-autofill-selected {
  background-color: transparent !important;
  background-image: none !important;
  color: #000000 !important;
}

`;

export {GlobalStyle, GlobalTheme};