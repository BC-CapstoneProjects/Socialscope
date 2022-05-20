import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SpinnerDotted } from "spinners-react";

import InputButton from './Input/InputButton';

const ProgressBarContainer = styled.div`
  margin: 2rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const blinkingEffect = () => {
    return keyframes`
    50% {
      opacity: 0;
    }
  `;
}

const AnimatedComponent = styled.div`
  animation: ${blinkingEffect} 2s linear infinite;
`

const ProgressBar = (props) => {

  return (
    <ProgressBarContainer>
      <AnimatedComponent style={{marginRight: "30px"}}>Collecting and analyzing data...</AnimatedComponent>
      <SpinnerDotted size={67} thickness={150} speed={80} color={"#5066fe"} style={{marginRight: "30px"}}/>
      <InputButton type='tertiary' onClick={props.cancelClick}>
        Cancel
      </InputButton>
    </ProgressBarContainer>
  )
}

export default ProgressBar;