import React from 'react'
import styled from 'styled-components'
import { FiMenu } from 'react-icons/fi';

const ButtonContainer = styled.div`
  align-content: flex-start;
  display: none;

  @media screen and (max-width: 750px) {
    display: flex;
    flex: 1;
  }
`;

const Button = styled(FiMenu)`
  width:25px;
  height:25px;
  background: white;
`;

const PopoutButton = (props) => {
  return (
    <ButtonContainer className={props.className}>
      <Button onClick={props.onClick} data-cy='popout-menu-button'>
        {props.children}
      </Button>
    </ButtonContainer>
  )
}

export default PopoutButton;