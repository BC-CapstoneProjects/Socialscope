import React from 'react'
import styled from 'styled-components'

const MenuContainer = styled.div`
  position: relative;
`;

const Menu = styled.div`
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

const PopoutMenu = (props) => {
  return (
    <MenuContainer>
      <Menu data-cy='popout-menu-container'>
        {props.children}
      </Menu>
    </MenuContainer>
  );
}

export default PopoutMenu;