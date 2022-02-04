
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
  const [keyword, setKeyword] = useState("");
  const [max, setMax] = useState("");
  const [isCheckedTwitter, setIsCheckedTwitter] = useState(false);
  const [isCheckedReddit, setIsCheckedReddit] = useState(false);
  const [isCheckedYoutube, setIsCheckedYoutube] = useState(false);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
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
                  keyword={keyword}
                  setKeyword={setKeyword}
                  twitterCheck={isCheckedTwitter}
                  setTwitterCheck={setIsCheckedTwitter}
                  youtubeCheck={isCheckedYoutube}
                  setYoutubeCheck={setIsCheckedYoutube}
                  redditCheck={isCheckedReddit}
                  setRedditCheck={setIsCheckedReddit}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  max={max}
                  setMax={setMax}
                  result={result}
                  setResult={setResult}
              />
          } />
          <Route path="/results" element={<ResultsView />}>
            <Route path="/results/preview" element={<PreviewPage result={result}/>}/>
            <Route path="/results/graph" element={<GraphPage />}/>
            <Route path="/results/download" element={<DownloadPage />}/>
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
