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
import "../App.css"
function initializeResults() {
  try {
    let localResults = JSON.parse(window.localStorage.getItem('results'));
    if (localResults != null && Number.isInteger(localResults["currentResultIndex"]) 
        && localResults["historyList"] != null && localResults["historyList"].length > 0 
        && localResults["currentResultIndex"] >= 0 
        && localResults["currentResultIndex"] < localResults["historyList"].length ) {
      return localResults;
    }
  }
  catch (ex) {
    console.log(ex);
  }
  return {
    currentResultIndex: null,
    historyList: []
  };
}

function addResultWithSetter(resultAdding, results, setResults, isNewCurrent=true) {
  let newResults = {
    currentResultIndex: isNewCurrent ? results.historyList.length : results.currentResultIndex,
    historyList: [
      ...results.historyList,
      resultAdding
    ]
  }
  window.localStorage.setItem('results', JSON.stringify(newResults));
  setResults(newResults);
  return true;
}

function getMatchingResultIndex(resultData, resultList) {
  if (resultData == null || Object.keys(resultData) < 1)
    return -1;
  for (let index = 0; index < resultList.historyList.length; index++) {
    let currentResult = resultList.historyList[index];
    let currentResultIsMatch = true;
    // query and time must match if included
    if (currentResult.meta.query != null && resultData.meta.query != null && currentResult.meta.query !== resultData.meta.query) 
      currentResultIsMatch = false;
    if (currentResult.meta.time != null && resultData.meta.time != null && currentResult.meta.time !== resultData.meta.time) 
      currentResultIsMatch = false;
    if (currentResultIsMatch)
      return index;
  }
  return -1;
}

function removeResultWithSetter(resultRemovingData, results, setResults) {
  let index = getMatchingResultIndex(resultRemovingData, results);
  if (index >= 0) {
    let newCurrentResultIndex = null;
    if (index < results.currentResultIndex) newCurrentResultIndex = results.currentResultIndex - 1;
    else if (index > results.currentResultIndex) newCurrentResultIndex = results.currentResultIndex;
    let newHistoryList = results.historyList;
    newHistoryList.splice(index, 1);
    let newResults = {
      currentResultIndex: newCurrentResultIndex,
      historyList: newHistoryList
    }
    window.localStorage.setItem('results', JSON.stringify(newResults));
    setResults(newResults);
    return true;
  }
  return false;
}

function changeCurrentResultWithSetter(newCurrentResultData, results, setResults) {
  let index = getMatchingResultIndex(newCurrentResultData, results);
  if (index >= 0) {
    let newResults = {
      currentResultIndex: index,
      historyList: [
        ...results.historyList
      ]
    }
    window.localStorage.setItem('results', JSON.stringify(newResults));
    setResults(newResults);
    return true;
  }
  return false
}

function App() {
  const [results, setResults] = useState(initializeResults());

  const addResult = result => addResultWithSetter(result, results, setResults);
  const removeResult = result => removeResultWithSetter(result, results, setResults);
  const changeCurrentResult = result => changeCurrentResultWithSetter(result, results, setResults);

  let currentResult = results.historyList[results.currentResultIndex] || null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewWrapper />}>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/search" element={
            <SearchPage
              result={currentResult}
              setResult={addResult}
            />
          } />
          <Route path="/results" element={<ResultsView />}>
            <Route path="/results/preview" element={<PreviewPage result={currentResult}/>}/>
            <Route path="/results/graph" element={<GraphPage result={currentResult}/>} />
            <Route path="/results/download" element={<DownloadPage result={currentResult}/>}/>
          </Route>
          <Route path="/history" element={
            <HistoryPage 
              results={results}
              changeCurrentResult={changeCurrentResult}
              removeResult={removeResult}
              />
          } />
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
