import React, {useState} from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Routes, Outlet, BrowserRouter } from "react-router-dom"

import {GlobalStyle, GlobalTheme} from './GlobalStyle';
import Navbar from '../components/Navbar/Navbar';
import LandingPage from './LandingPage';
import SearchPage from './SearchPage';
import HistoryPage from './HistoryPage';
import FaqPage from './FaqPage';
import ResultsView from '../components/ResultsView';
import PreviewPage from './PreviewPage';
import GraphPage from './GraphPage';
import DownloadPage from './DownloadPage';

function App() {
  const [result, setResult] = useState(undefined);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewWrapper />}>
          <Route path="/" element={<LandingPage />}/>
          <Route
              path="/search"
              element={
              <SearchPage
                  result={result}
                  setResult={setResult}
              />
          } />
          <Route path="/results" element={<ResultsView />}>
            <Route path="/results/preview" element={<PreviewPage result={result}/>}/>
            <Route path="/results/graph" element={<GraphPage result={result}/>} />
            <Route path="/results/download" element={<DownloadPage result={result}/>}/>
          </Route>
          <Route path="/history" element={<HistoryPage />}/>
          <Route path="/faq" element={<FaqPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const ViewWrapper= () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={GlobalTheme}>
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </React.Fragment>
  );
}


export default App;
