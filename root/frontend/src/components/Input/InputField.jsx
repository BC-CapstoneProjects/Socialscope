import React from 'react'
import styled from 'styled-components'

const EntryContainer = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`

const Input = styled.input`
  ${props => props.type==='text' && 'flex:1;'}
  background-color: ${props => props.theme.colors.secondary};
  color: #6D6D6D;
  font-style: italic;
  width: ${props => props.width ? props.width : 'auto'};
`;

const Label = styled.label`
  margin-bottom: 0px;
`

const InputField = (props) => {
  return (
    <EntryContainer>
        <Input className={props.className}
          name={props.name} 
          id={props.value} 
          type={props.type} 
          value={props.value} 
          placeholder={props.placeholder} 
          width={props.width}
        />
        { (props.label) && (
          <Label htmlFor={props.id}>
            {props.label}
          </Label>
        )}
    </EntryContainer>
  );
}

export default InputField