
import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

import interpolateColors from './interpolateColors';
import usePrevious from '../../hooks/usePrevious';
import { arc, dsv } from 'd3';

const PieContainer = styled.div`  //TODO: refactor style and containers to own file
  display: flex;
  align-content: center;

  &.pie-label {
    width: 50px;
    height: 50px;
    background-color: green;
  }

  &.pie-image {
    display: block;
    margin: auto;
    position: relative;
    flex:1;
  }

  &.pie-image > svg {
    display: block;
  }

`

const PieChart = (props) => {

  const gref = useRef(null);
  const lref = useRef(null);
  const radius = props.size / 2
  const slices = Object.keys(props.data).length;

  const pieGen = d3.pie()
    .value(d => d.value)
    .sort(null)
    .padAngle(0.1 / slices)

  const arcGen = d3.arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

  const colorGen = d3.scaleOrdinal(interpolateColors('#FF0000', '#0000FF', slices));
  
  function enterData(group, label, data) {
    const gData = group.selectAll('g.slice').data(data);

    gData.exit()
      .remove();

    const gUpdate = gData
      .enter()
      .append('g')
      .attr('class', 'slice');

    const path = gUpdate
      .append('path')
      .merge(gData.select('path.arc'))

    path
      .attr('class', 'arc')
      .attr('fill', (d, i) => colorGen(i))
      .transition()
      .duration(500)
      .attrTween('d', (d) => {
        let i = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t) {
          return arcGen(i(t));
        }
      })

    path.on('mouseover', (d, i) => {
      console.log(d);
      const p = Math.round((d.target.__data__.endAngle - d.target.__data__.startAngle) / (2 * Math.PI) * 10000) / 100;
      label.attr('background-color', 'orange');
      /*
      s.transition()
        .duration(50)
        .attr('opacity', '0.85');
      label.transition()
        .duration(50)
        .style('opacity', 1)
      label
        .attr('transform', (d) => {
          d.innerRadius = 0;
          d.outerRadius = radius;
          return `translate(${arcGen.centroid(d)})`;
        })
        .attr('text-anchor', 'middle')
        .html(`<p>${p}%</p>`)
        */
        
    })

    path.on('mouseout', (d, i) => {
      const s = d3.select(this)
      s.transition()
        .duration(50)
        .attr('opacity', '1');
      /*
      label.transition()
        .duration(50)
        .style('opacity', 0)
      */
    })
    
  }

  useEffect(() => {

    const data = pieGen(props.data)
    const group = d3.select(gref.current)
    const label = d3.select(lref.current)

    if (group.selectChildren().empty()) {
      enterData(group, label, data);
    }
    else {
      group.selectAll('g.slice').select('path.arc')
      .transition()
      .duration(500)
      .attrTween('d', (d) => {
        var i = d3.interpolate(d, {startAngle: 2*Math.PI, endAngle: 2*Math.PI});
        return function(t) {
          return arcGen(i(t));
        }
      })
      .on('end', () => {enterData(group, label, data)});
    }

  }, [props.data]); 

  return (
    <PieContainer>
      <div ref={lref} className='pie-legend'></div>
      <div className='pie-image'>
        <svg width={props.size} height={props.size}>
          <g ref={gref} transform={`translate(${radius}, ${radius})`}>
          </g>
        </svg>
      </div>
    </PieContainer>
  );

}

export default PieChart;