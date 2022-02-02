
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Route, Routes, Outlet, BrowserRouter } from "react-router-dom"

import Navbar from '../components/Navbar/Navbar';
import LandingPage from './LandingPage';
import SearchPage from './SearchPage';
import HistoryPage from './HistoryPage';
import FaqPage from './FaqPage';

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

`;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewWithNavbar />}>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results">
            <Route path="/results/preview" element={<div>preview</div>}/>
            <Route path="/results/graph" />
            <Route path="/results/download" />
          </Route>
          <Route path="/history" element={<HistoryPage />}/>
          <Route path="/faq" element={<FaqPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const ViewWithNavbar = () => {
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
