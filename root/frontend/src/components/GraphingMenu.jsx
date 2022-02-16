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

const GraphingMenu = () => {

  const [graphValue, setGraphValue] = useState(0);
  const [overValue, setOverValue] = useState(0);
  const [groupValue, setGroupValue] = useState(0);

  const menuInputWidth = {label: '100px', content: '150px'}
  const menuOptionTree = {'Graph':{'Sentiment':{'Over':{'All':{'Group': {'Platform': ''}}}}, 'Likes':{'Over':{'All':{'Group': {'Platform': ''}}}}, 'Comments':{'Over':{'All':{'Group': {'Platform': ''}}, 'Sentiment':{'Group': {'All': ''}}}}}};

  const updateGraphValue = (val) => {
    setGraphValue(val);
    if (menuOptionTree['Graph'][graphValue]) 
      setOverValue(Object.keys(menuOptionTree['Graph'][graphValue]['Over'])[0]);
    if (menuOptionTree['Graph'][graphValue] && menuOptionTree['Graph'][graphValue]['Over'][overValue])
      setGroupValue(Object.keys(menuOptionTree['Graph'][graphValue]['Over'][overValue]['Group'])[0]);
  }

  const updateOverValue = (val) => {
    setOverValue(val);
    if (menuOptionTree['Graph'][graphValue] && menuOptionTree['Graph'][graphValue]['Over'][overValue])
      setGroupValue(Object.keys(menuOptionTree['Graph'][graphValue]['Over'][overValue]['Group'])[0]);
  }

  const updateGroupValue = (val) => {
    setGroupValue(val);
  }

  const mapOptions = (optionSubTree, placeholder='--') => [{text:placeholder, value:''}, ...Object.keys(optionSubTree).map(option => ({text:option, value:option}))]

  const testOptions = [
    {text:'placeholder:', value:''},
    {text:'option1', value:'one'},
    {text:'option2', value:'two'},
    {text:'option3', value:'three'}
  ]

  return (
    <FormContainerOuter>

      <h3>Graph Options</h3>

      <FormContainerInner>

        <FormRowFull>
          <InputContainer label="Graph" labelWidth={menuInputWidth.label} contentWidth={menuInputWidth.content}>
            <InputSelect 
              options={mapOptions(menuOptionTree['Graph'])} 
              updateValue={updateGraphValue}
              width='150px'
            />
          </InputContainer>
        </FormRowFull>

        <FormRowFull>
          <InputContainer label="Over" labelWidth={menuInputWidth.label} contentWidth={menuInputWidth.content}>
            <InputSelect 
              options={menuOptionTree['Graph'][graphValue] ? mapOptions(menuOptionTree['Graph'][graphValue]['Over']) : [{text:'--', value:''}]} 
              updateValue={updateOverValue}
              width='150px'
            />
          </InputContainer>
        </FormRowFull>

        <FormRowFull>
          <InputContainer label="Grouped By" labelWidth={menuInputWidth.label} contentWidth={menuInputWidth.content}>
            <InputSelect 
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