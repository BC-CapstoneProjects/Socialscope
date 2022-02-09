import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const NavbarContainer = styled.div`
  background: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 6rem;
  margin: 25px auto;
  max-width: 75%;

  @media screen and (max-width: 1000px) {
    max-width: 750px;
  }

  @media screen and (max-width: 750px) {
    padding: 2rem 4rem;
  }

  @media screen and (max-width: 450px) {
    padding: 2rem;
  }
`;

const NavbarItems = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const LogoContainer = styled.div`
  margin-right: 2rem;
`;

const LogoText = styled.span`
  background: ${props => props.theme.colors.secondary};
  font-size: 2.5rem;
  font-weight: 150%;
  border: none;
  border-radius: 20px;
  padding:5px 5px 10px 5px;
`;

const NavSpacer = styled.div`
  display: flex;
  flex: 1 0;
`

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const NavLink = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem 1rem;
  flex: 1;
`

const PopoutButton = styled.button`
  width:25px;
  height:25px;
  display: none;
  background: white;

  @media screen and (max-width: 750px) {
    display: flex;
  }
`;

const PopoutMenuContainer = styled.div`
  position: relative;
`;

const PopoutMenu = styled.div`
  display: none;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
    
  text-align: end;
  background: ${props => props.theme.colors.secondary};
  padding: 2rem;
  position: absolute;
  top: 30px;
  right: 0;
  margin-top: 0.5rem;
  min-width: 210px;
  border-radius: 5px;
  border-style: solid;
  border-width: 2px;
  border-color: ${props => props.theme.colors.primary};
  box-shadow: 3px 3px 2px grey;

  @media screen and (max-width: 750px) {
  display: flex;
  }
`;

const PopoutMenuLinks = styled.div`
  
`;

const NavLinks = () => {
  return (
    <React.Fragment>
      <NavLink><Link to="/">Home</Link></NavLink>
      <NavLink><Link to="/search">Search</Link></NavLink>
      <NavLink>History</NavLink>
      <NavLink>FAQ</NavLink>
    </React.Fragment>
  );
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <NavbarContainer>
      <NavbarItems>
        <LogoContainer>
          <LogoText>
            Socialscope
          </LogoText>
        </LogoContainer>
        <NavSpacer />
        <LinksContainer>
          <NavLinks />
        </LinksContainer>
        { toggleMenu ?
          <PopoutButton onClick={() => setToggleMenu(false)}/> :
          <PopoutButton onClick={() => setToggleMenu(true)}/>
        }
        { toggleMenu && ( 
          <PopoutMenuContainer>
            <PopoutMenu>
              <PopoutMenuLinks>
              <NavLinks />
              </PopoutMenuLinks>
            </PopoutMenu>
          </PopoutMenuContainer>
          )
        }
      </NavbarItems>
    </NavbarContainer>
  );
}

export default Navbar;