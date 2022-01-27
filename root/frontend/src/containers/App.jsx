
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Route, Routes, Outlet, BrowserRouter } from "react-router-dom"

import Navbar from '../components/Navbar';
import LandingPage from './LandingPage';
import SearchPage from './SearchPage';

const theme = {
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
    background: ${theme.colors.background};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
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

`;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewWithNavbar />}>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/search" element={<SearchPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function ViewWithNavbar() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
