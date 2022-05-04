import React, {useRef} from 'react';
import styled from 'styled-components';

import LineSvg from './LineSvg';

const ChartContainer = styled.div`
  position: relative;
  margin: ${props => props.margin + 'px'};
  width: ${props => props.width + 'px'};
  height:${props => props.height + 'px'};

  & .chart-legend {
    position: absolute;
    display: flex;
    visibility: hidden;
    width: max-content;
    height: max-content;
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

const LineChart = (props) => {

  const lref = useRef(null);

  return (
    <ChartContainer width={props.structure.width + 2* props.structure.margin} height={props.structure.height + 2*props.structure.margin}>
      <div className='chart-legend' ref={lref}/>
      <div className='chart-image'>
        <LineSvg data={props.data} dtype={props.dtype} lref={lref} structure={props.structure}/>
      </div>
    </ChartContainer>
  );
}

export default LineChart;