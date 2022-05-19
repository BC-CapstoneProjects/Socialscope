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
  const [data, setData] = useState(undefined)
  const [name, setName] = useState("")
  const [HistoryData, setHistoryData] = useState([{
    result:"",
    keyword:"",
    index:"",
    date:"",
    button:""
  }]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewWrapper />}>
          <Route path="/" element={<LandingPage />}/>
          <Route
              path="/search"
              element={
              <SearchPage
              HistoryData={HistoryData}
               setHistoryData={setHistoryData}
               data={data}
               setData={setData}
               name={name}
               setName={setName}
              />
          } />
          <Route path="/results" element={<ResultsView />}>
            <Route path="/results/preview" element={<PreviewPage
             HistoryData={HistoryData}
             setHistoryData={setHistoryData}
            data={data}
             setData={setData}
             name={name}
             setName={setName}/>}/>
            <Route path="/results/graph" element={<GraphPage 
             HistoryData={HistoryData}
             setHistoryData={setHistoryData}
        />} />
            <Route path="/results/download" element={<DownloadPage />}/>
          </Route>
          <Route path="/history" element={<HistoryPage 
           HistoryData={HistoryData}
           setHistoryData={setHistoryData}
          />}/>
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
