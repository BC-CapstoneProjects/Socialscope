import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)`
  font-size: 1.5rem;
  margin: 0.5rem 1rem;
  flex: 1;

  &.active {
    text-decoration: underline;
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