import React, {useRef} from 'react';
import styled from 'styled-components';

import LineSvg from './LineSvg';

const ChartContainer = styled.div`
  position: relative;
  margin: ${props => props.margin + 'px'};
  width: ${props => props.width + 'px'};
  height:${props => props.height + 'px'};
`
  
const LegendContainer = styled.div`
  position: absolute;
  padding: 0 10px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 1rem;
`

const Legend = styled.div`
  visibility: hidden;
  width: max-content;
  height: max-content;
  pointer-events: none;
  background-color: ${props => props.theme.colors.secondary};
  padding: 2px;
  border-radius: 3px;  // repeated style for nav popout menu
  border-style: solid;
  border-width: 2px;
  border-color: ${props => props.theme.colors.primary};
  box-shadow: 3px 3px 2px ${props => props.theme.colors.outline};
  font-style: italic;
`

const LineChart = (props) => {

  const lref = useRef(null);

  return (
    <ChartContainer width={props.structure.width + 2* props.structure.margin} height={props.structure.height + 2*props.structure.margin}>
      <LegendContainer>
        <Legend className='chart-legend' ref={lref}>legend</Legend>
      </LegendContainer>
      <div className='chart-image'>
        <LineSvg data={props.data} dtype={props.dtype} lref={lref} structure={props.structure}/>
      </div>
    </ChartContainer>
  );
}

export default LineChart;