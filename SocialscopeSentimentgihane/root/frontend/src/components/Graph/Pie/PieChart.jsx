import React, {useRef} from 'react';
import styled from 'styled-components';

import PieSvg from './PieSvg';

const PieContainer = styled.div` 
  position: relative;
  margin: auto;
  width: ${props => props.width + 'px'};
  height:${props => props.height + 'px'};

  &>.pie-legend {
    opacity: 0;
    position: absolute;
    width: 70px;
    display: flex;
    justify-content: center;
    pointer-events: none;
    background-color: ${props => props.theme.colors.secondary};
    padding: 2px;
    border-radius: 3px;  // repeated style for nav popout menu
    border-style: solid;
    border-width: 2px;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 3px 3px 2px grey;
    font-style: italic;
  }

`

const PieChart = (props) => {

  const lref = useRef(null);

  return (
    <PieContainer width={props.width} height={props.height}>
      <div ref={lref} className='pie-legend'>test</div>
      <div className='pie-image'>
        <PieSvg data={props.data} lref={lref} size={Math.min(props.width, props.height)} />
      </div>
    </PieContainer>
  );
}

export default PieChart;