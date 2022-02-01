import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  width: ${props => props.width || "150px"};
  height: ${props => props.height || "55px"};
  border: none;
  outline: none;
`;

const Button = styled.button`
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.secondary};
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
`;

const InputButton = (props) => {
  return (
    <ButtonContainer height={props.height} width={props.width} className={props.className}>
      <Button type={props.type} onClick={props.onClick}>{props.children}</Button>
    </ButtonContainer>
  );
}

export default InputButton;