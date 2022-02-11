import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  width: auto;
  height: auto;
  border: none;
  outline: none;
`;

const ButtonTemplate = styled.button`
  width: max-content;
  height: max-content;
  background: ${props => props.theme.colors.secondary};
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
`;

const ButtonPrimary = styled(ButtonTemplate)`
  padding: 0.75rem;
  font-size: 1.5rem;
  font-weight: bold;
`

const ButtonSecondary = styled(ButtonTemplate)`
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`

const ButtonTertiary = styled(ButtonTemplate)`
  padding: 0.3rem;
  font-size: 0.9rem;
  font-weight: normal;
`

const InputButton = (props) => {

  const Button = (props) => {
    if (props.type === 'primary') {
      return ( <ButtonPrimary {...props} />);
    }
    else if (props.type === 'secondary') {
      return ( <ButtonSecondary {...props} />);
    }
    else if (props.type === 'tertiary') {
      return ( <ButtonTertiary {...props} />);
    }
    else {
      return ( <ButtonTemplate {...props} />);
    }
  }

  return (
    <ButtonContainer className={props.className}>
      <Button type={props.type} onClick={props.onClick}>{props.children}</Button>
    </ButtonContainer>
  );
}

export default InputButton;