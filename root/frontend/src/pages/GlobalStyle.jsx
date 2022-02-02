import { createGlobalStyle } from 'styled-components';

const GlobalTheme = {
    colors: {
      "primary": "#C4C4C4",
      "secondary": "#D6D6D6",
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

body {
  height:100%;
  width:100%;
  background: ${GlobalTheme.colors.background};
  font-family: 'Roboto', 'sans-serif';
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: unset;
  text-decoration: none;
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

`;

export {GlobalStyle, GlobalTheme};