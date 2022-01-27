import React from 'react'
import styled from 'styled-components'

const EntryContainer = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 5px;
`

const Input = styled.input`
  background-color: ${props => props.theme.colors.secondary};
  color: #6D6D6D;
  font-style: italic;
`;

const Label = styled.label`
  margin-bottom: 0px;
`

const InputField = (props) => {
  return (
    <EntryContainer>
        <Input name={props.name} id={props.value} type={props.type} value={props.value} />
        { (props.label) && (
          <Label htmlFor={props.id}>
            {props.label}
          </Label>
        )}
    </EntryContainer>
  );
}

export default InputField