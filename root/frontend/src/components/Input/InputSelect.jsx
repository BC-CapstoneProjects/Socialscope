import { autoType } from 'd3'
import React, {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'

import useOutsideClickAlert from '../../hooks/useOutsideClickAlert'

const SelectContainer = styled.div`
  position: relative;
  background-color: ${props => props.theme.colors.secondary};
  display: flex;
  width: ${props => props.width ? props.width : 'auto'};
  align-items: center;
  justify-content: flex-start;
  gap: 5px;

  // disable highlighting text
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none; 
  user-select: none;

`

const Selected = styled.div`
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`

const SelectItemListContainer = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  position: absolute;
  top: 24px;
  right: 6px;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.outline};
  border-top: none;
  border-radius: 0 0 5px 5px;
  background-color: ${props => props.theme.colors.secondary};
  z-index: 2;
  box-shadow: 3px 3px 2px grey;
`

const SelectItem = styled.div`
  cursor: pointer;
  margin: 5px 3px 8px 5px;
  padding: 2px;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`

const InputSelect = (props) => {

  const [selectionIndex, setSelectionIndex] = useState(0); // 0th option is placeholder
  const [selectionListHidden, setSelectionListHidden] = useState(true);

  const sRef = useRef(null);
  useOutsideClickAlert(sRef, () => {setSelectionListHidden(true)})

  const toggleItemList = () => {
    setSelectionListHidden(!selectionListHidden);
  }

  const updateSelection = (index) => {
    setSelectionIndex(index);
    setSelectionListHidden(true);
    props.updateValue(props.options[index].value);
  }

  const SelectItemList = () => {
    let renderedSelectItems = [];
    for (let i = 1; i < props.options.length; i++) { 
      renderedSelectItems.push(
        <SelectItem key={i} isSelected={selectionIndex === i} onClick={() => updateSelection(i)} data-cy='select-menu-option'>   
          {props.options[i].text}
        </SelectItem>);
    }
    return renderedSelectItems;
  }

  useEffect(() => {
    if (!(props.number <= props.lastSelected)) 
      setSelectionIndex(0);
  }, [props.options])

  return (
    <SelectContainer ref={sRef} width={props.width}>
      <Selected onClick={toggleItemList} data-cy='select-menu-selection'>
        {props.options[selectionIndex] ? props.options[selectionIndex].text : props.options[0].text}
      </Selected>
      <SelectItemListContainer hidden={selectionListHidden}>
        <SelectItemList />  
      </SelectItemListContainer>
    </SelectContainer>
  );
}

export default InputSelect;