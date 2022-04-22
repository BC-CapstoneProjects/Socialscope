import React, {useRef, useState} from "react";
import styled from "styled-components";

import InputContainer from "./Input/InputContainer";
import InputSelect from "./Input/InputSelect";

const FormContainerOuter = styled.div` // repeated style from search page. temporary and will need refactor
  min-width: 200px;
  max-width: 750px;
  margin: 0 auto;
`

const FormContainerInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FormRowFull = styled.div`
  flex: 1 0 100%;
`

const GraphingMenu = (props) => {

  const [graphValue, setGraphValue] = useState(0);
  const [overValue, setOverValue] = useState(0);
  const [groupValue, setGroupValue] = useState(0);
  const [lastSelected, setLastSelected] = useState(0);

  const menuInputWidth = {label: '100px', content: '150px'}
  const menuOptionTree = {'Graph':
    { 'Likes':{'Over':{
      'All':{'Group': {
        'Platform': ''}}
    }}, 
    'Comments':{'Over':{
      'Time':{'Group': {
        'Platform': ''}}
    }},
    'Sentiment':{'Over':{
      'All':{'Group': {
        'Score': ''}}
    }}
  }};

  const updateGraphValue = (val) => {
    if (graphValue !== val) {
      setGraphValue(val);
      props.updateMenuSelections(val, '', '');
      setLastSelected(1);
      setOverValue(0);
      setGroupValue(0);
    }
  }

  const updateOverValue = (val) => {
    if(overValue !== val) {
      setOverValue(val);
      props.updateMenuSelections(undefined, val, '');
      setLastSelected(2);
      setGroupValue(0);
    } 
  }

  const updateGroupValue = (val) => {
    if(groupValue !== val) {
      setGroupValue(val);
      props.updateMenuSelections(undefined, undefined, val);
      setLastSelected(3);
    }
  }

  const mapOptions = (optionSubTree, placeholder='--') => [{text:placeholder, value:''}, ...Object.keys(optionSubTree).map(option => ({text:option, value:option}))]

  return (
    <FormContainerOuter>

      <h3>Graph Options</h3>

      <FormContainerInner>

        <FormRowFull>
          <InputContainer label="Graph" labelWidth={menuInputWidth.label} contentWidth={menuInputWidth.content}>
            <InputSelect 
              number={1}
              lastSelected={lastSelected}
              options={mapOptions(menuOptionTree['Graph'])} 
              updateValue={updateGraphValue}
              width='150px'
            />
          </InputContainer>
        </FormRowFull>

        <FormRowFull>
          <InputContainer label="Over" labelWidth={menuInputWidth.label} contentWidth={menuInputWidth.content}>
            <InputSelect 
              number={2}
              lastSelected={lastSelected}
              options={menuOptionTree['Graph'][graphValue] ? mapOptions(menuOptionTree['Graph'][graphValue]['Over']) : [{text:'--', value:''}]} 
              updateValue={updateOverValue}
              width='150px'
            />
          </InputContainer>
        </FormRowFull>

        <FormRowFull>
          <InputContainer label="Grouped By" labelWidth={menuInputWidth.label} contentWidth={menuInputWidth.content}>
            <InputSelect 
              number={3}
              lastSelected={lastSelected}
              options={(menuOptionTree['Graph'][graphValue] && menuOptionTree['Graph'][graphValue]['Over'][overValue]) ? mapOptions(menuOptionTree['Graph'][graphValue]['Over'][overValue]['Group']) : [{text:'--', value:''}]} 
              updateValue={updateGroupValue}
              width='150px'
            />
          </InputContainer>
        </FormRowFull>

      </FormContainerInner>

    </FormContainerOuter>
  );
}

export default GraphingMenu;