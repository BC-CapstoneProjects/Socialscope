import { createGlobalStyle } from 'styled-components';

const GlobalTheme = {
    colors: {
      "primary": "#D6D6D6",
      "secondary": "#E7E7E7",
      "background": "#FFFFFF",
      "outline": "#6D6D6D"
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
  background: ${GlobalTheme.colors.background};
  font-family: 'Roboto', 'sans-serif';
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  color: #000000;

  &:hover {
    color: #000099 !important;
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