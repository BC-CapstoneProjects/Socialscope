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
  function handleText(e)
  {
    props.type === "checkbox" ? props.setValue(!props.value) : props.setValue(e.target.value)
  }

  return (
    <EntryContainer>
        <Input className={props.className}
          name={props.name} //query id={props.value}
          aria-label={props.name}
          type={props.type} //text, checkbox
          value={props.value}
          onChange={handleText}
          placeholder={props.placeholder}
          width={props.width}
          autoComplete={'off'}
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