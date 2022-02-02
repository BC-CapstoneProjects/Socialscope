import React from 'react';
import styled from 'styled-components'
import { Link, Outlet } from 'react-router-dom';

import ContentContainer from './ContentContainer';

const ResultsNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
  min-height: 65px;

  @media screen and (max-width: 400px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ResultsView = () => {
  return (
    <ContentContainer>
      <ResultsNavbar>
        <h3><Link to="/results/preview">Preview</Link></h3>
        <h3><Link to="/results/graph">Graph</Link></h3>
        <h3><Link to="/results/download">Download</Link></h3>
      </ResultsNavbar>
      <Outlet />
    </ContentContainer>
  );
}

export default ResultsView;