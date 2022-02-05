
import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';

import interpolateColors from './interpolateColors';
import usePrevious from '../../hooks/usePrevious';
import { arc } from 'd3';



const PieChart = ({data, size}) => {
  const prevData = usePrevious(data);
  const svgRef = useRef(null);
  const radius = size / 2

  function renderChart() {
  
  }

  useEffect(() => {

    renderChart();

    const currentSvgElement = d3.select(svgRef.current);
    currentSvgElement.selectAll('*').remove();
    const svg = currentSvgElement
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    const colorGen = d3.scaleOrdinal()
      .range(interpolateColors('#0000FF', '#FF0000', Object.entries(data).length));

    const pieGen = d3.pie()
      .value((d) => d[1]);

    const arcGen = d3.arc()
      .innerRadius(radius / 2)
      .outerRadius(radius)

    const prev_pie_data = pieGen(Object.entries(prevData))
    const curr_pie_data = pieGen(Object.entries(data));

    svg
      .selectAll()
      .data(curr_pie_data)
      .join('path')
      .attr('d', arcGen)
      .attr('fill', (d) => {return(colorGen(d.data[1]))})
      .selectAll()
      .each((d, i, node) => {
        
      })


  }, [data]);


  return (
    <svg ref={svgRef} width={size} height={size} />

  );
}

export default PieChart;