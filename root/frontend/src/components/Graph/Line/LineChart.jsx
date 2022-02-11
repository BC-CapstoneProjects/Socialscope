import React, {useRef} from 'react';
import styled from 'styled-components';

import LineSvg from './LineSvg';

const ChartContainer = styled.div`
  position: relative;
  margin: auto;
  width: ${props => props.width + 'px'};
  height:${props => props.height + 'px'};
`

const LineChart = (props) => {
  return (
    <ChartContainer width={props.structure.width} height={props.structure.height}>
      <div className='chart-image'>
        <LineSvg data={props.data} structure={props.structure}/>
      </div>
    </ChartContainer>
  );
}

export default LineChart;