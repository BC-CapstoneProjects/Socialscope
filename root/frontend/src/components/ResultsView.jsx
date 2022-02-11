import React from 'react';
import styled from 'styled-components'
import { NavLink, Outlet } from 'react-router-dom';

import ContentContainer from './ContentContainer';

const StyledLink = styled(NavLink)`
  font-size: 1.5rem;

  &.active {
    text-decoration: underline;
  }
`

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
        <StyledLink to='./preview'>Preview</StyledLink>
        <StyledLink to='./graph'>Graph</StyledLink>
        <StyledLink to='./download'>Download</StyledLink>
      </ResultsNavbar>
      <Outlet />
    </ContentContainer>
  );
}

export default ResultsView;