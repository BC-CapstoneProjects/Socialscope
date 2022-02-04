import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const NavLink = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem 1rem;
  flex: 1;
`

const NavLinks = () => {
  return (
    <React.Fragment>
      <NavLink><Link to="/">Home</Link></NavLink>
      <NavLink><Link to="/search">Search</Link></NavLink>
      <NavLink><Link to="/history">History</Link></NavLink>
      <NavLink><Link to="/faq">FAQ</Link></NavLink>
    </React.Fragment>
  );
}

export default NavLinks;