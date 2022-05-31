import React, { forwardRef } from 'react'
import styled from 'styled-components'

const MenuContainer = styled.div`
  position: relative;
`;

const Menu = styled.div`
  display: none;
  z-index: 1;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  
  text-align: end;
  background: ${props => props.theme.colors.secondary};
  padding: 1rem;
  position: absolute;
  top: 10px;
  right: 10px;
  margin-top: 0.5rem;
  min-width: 100px;
  border-radius: 5px;
  border-style: solid;
  border-width: 2px;
  border-color: ${props => props.theme.colors.outline};
  box-shadow: 3px 3px 2px ${props => props.theme.colors.outline};

  @media screen and (max-width: 750px) 
  {
    display: flex;
  }
`;

const PopoutMenu = forwardRef((props, ref) => {
  return (
    <MenuContainer>
      <Menu data-cy='popout-menu-container' ref={ref}>
        {props.children}
      </Menu>
    </MenuContainer>
  );
});

export default PopoutMenu;