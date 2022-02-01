import React, { useState } from 'react'
import styled from 'styled-components'

import NavLinks from './NavLinks'
import PopoutMenu from './PopoutMenu'

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

const PopoutButton = styled.button`
  width:25px;
  height:25px;
  display: none;
  background: white;

  @media screen and (max-width: 750px) {
    display: flex;
  }
`;

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
          <PopoutMenu>
            <NavLinks/>
          </PopoutMenu> )
        }
      </NavbarItems>
    </NavbarContainer>
  );
}

export default Navbar;