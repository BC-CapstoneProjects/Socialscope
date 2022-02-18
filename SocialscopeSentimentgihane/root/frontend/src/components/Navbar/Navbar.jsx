import React, { useState } from 'react'
import styled from 'styled-components'

import NavLinks from './NavLinks'
import PopoutMenu from './PopoutMenu'
import PopoutButton from './PopoutButton'

const NavbarContainer = styled.div`
  background: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  margin: 25px auto;
  max-width: 75%;

  @media screen and (max-width: 1017px) {
    max-width: 750px;
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
  padding: 15px 5px 15px 5px;
`;

const NavSpacer = styled.div`
  display: flex;
  flex: 1 0;

  @media screen and (max-width: 1017px) {
    flex: 3;
  }
`

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1.5;

  @media screen and (max-width: 750px) {
    display: none;
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