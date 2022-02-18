import React from 'react'
import styled from 'styled-components'
import { useLayoutEffect, useState, useRef } from 'react'
import useWindowDimensions from '../../hooks/useWindowDimensions';

const borderWidth = "1px";
const inputPadding = "5px";

const OuterContainer = styled.div`
  padding: none;
  margin: 0.5rem 0.5rem;
  display: flex;
  flex-direction: ${props => props.displayVertical ? 'column' : 'row'};
  align-items: stretch;
  width: max-content;
`;
 
const InnerContainer = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border: ${borderWidth} solid ${props => props.theme.colors.outline};
  border-radius: ${props => props.displayVertical ? '0px 0px 10px 10px' : '0px 10px 10px 0px'};
  flex: 1;
  display: flex;
  flex-direction: ${props => props.displayVertical ? 'column' : 'row'};
  align-items: center;
  gap: 1rem;
  padding: ${inputPadding};
  width: 100%;
  max-width: ${props => props.width ? props.width : 'auto'};
`;

const InputLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:  ${props => props.displayVertical ? 'center' : 'flex-start'};
  background-color: ${props => props.theme.colors.secondary};
  border: ${borderWidth} solid ${props => props.theme.colors.outline};
  border-radius: ${props => props.displayVertical ? '10px 10px 0px 0px' : '10px 0px 0px 10px'};
  ${props => props.displayVertical ? 'border-bottom: none' : 'border-right: none'};
  padding: ${inputPadding};
  text-align: ${props => props.displayVertical ? 'center' : 'start'};
  min-width: ${props => props.width ? props.width : 'auto'};
`;


const InputContainer = (props) => {
  
  const [displayVertical, setDisplayVertical] = useState(false);
  const [breakpointWidth, setBreakpointWidth] = useState(0);
  const outerRef = useRef(null);

  const {height, width} = useWindowDimensions()

  useLayoutEffect ( () => {   
    if (!displayVertical && outerRef.current.getBoundingClientRect().right > width){
      setBreakpointWidth(outerRef.current.getBoundingClientRect().right)
      setDisplayVertical(true);
    }
    else if (width > breakpointWidth) {
      setDisplayVertical(false);
    }
}, [outerRef, width]);

  return (
    <OuterContainer className={props.className} displayVertical={displayVertical}>
      <InputLabel displayVertical={displayVertical} width={props.labelWidth}>
        {props.label}
      </InputLabel>
      <InnerContainer ref={outerRef} displayVertical={displayVertical} width={props.contentWidth}>
        {props.children}
      </InnerContainer>
    </OuterContainer>
  )
}

export default InputContainer;
