import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import NavLinks from './NavLinks'
import PopoutMenu from './PopoutMenu'
import PopoutButton from './PopoutButton'
import useOutsideClickAlert from '../../hooks/useOutsideClickAlert'

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

  @media screen and (max-width: 450px) {
    margin: 10px auto;
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
  background: ${props => props.theme.colors.primary};
  outline: 3px solid ${props => props.theme.colors.tertiary_focus};
  color: ${props => props.theme.colors.tertiary_focus};
  font-size: 2.5rem;
  font-weight: 150%;
  border: none;
  border-radius: 40px;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
  -ms-border-radius: 40px;
  padding: 12px;

  @media screen and (max-width: 400px) {
    font-size: 2rem;
    padding: 6px;
  }

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
  const [toggleDisabled, setToggleDisabled] = useState(false);

  const mRef = useRef(null);

  useOutsideClickAlert(mRef, () => {
    setToggleDisabled(true);  // disable toggle button until mouseup to prevent immediate reopen on mouseup over toggle button
    setToggleMenu(false);
    document.addEventListener('mouseup', () => {
      setTimeout(() => {
        setToggleDisabled(false);  // enable toggle button again after slight delay to skip this mouse up event.
      }, 50);
    }, {once: true});
  })
  
  const renderPopoutButton = () => {
    if (toggleDisabled) {
      return <PopoutButton onClick={() => {}} />
    }
    else if (toggleMenu) {
      return <PopoutButton onClick={() => {setToggleMenu(false)}}/>
    }
    else {
      return <PopoutButton onClick={() => {if(!toggleDisabled) setToggleMenu(true);}}/>
    }
  }

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
        { renderPopoutButton() }
        { toggleMenu && ( 
          <PopoutMenu ref={mRef}>
            <NavLinks/>
          </PopoutMenu> )
        }
      </NavbarItems>
    </NavbarContainer>
  );
}

export default Navbar;