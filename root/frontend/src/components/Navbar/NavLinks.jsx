import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)`
    font-size: 2rem;
    margin: 0.2rem 0.5rem;
    flex: 1;
    &.active {
      text-decoration: underline;
    }
    
    @media screen and (max-width: 450px) {
      font-size: 1rem;
    }
`
const NavLinks = () => {
  return (
    <React.Fragment>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/search">Search</StyledLink>
      <StyledLink to="/history">History</StyledLink>
      <StyledLink to="/faq">FAQ</StyledLink>
    </React.Fragment>
  );
}

export default NavLinks;