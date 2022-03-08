import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';

import interpolateColors from '../util/interpolateColors';
import usePrevious from '../../../hooks/usePrevious';


const PieSvg = (props) => {
   
  // initialize constants
  const lref = props.lref;
  const labels = props.data.map(el => el.name);
  const total = props.data.map(el => el.value).reduce((p, c) => p + c);
  const slices = props.data.length;
  const gref = useRef(null);
  const radius = props.size / 2;
  const anglePadding = (slices > 1) ? 0.1 / slices : 0

  // d3 generators
  const pieGen = d3.pie()
    .value(d => d.value)
    .sort(null)
    .padAngle(anglePadding)

  const arcGen = d3.arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

  const colorGen = d3.scaleOrdinal(interpolateColors('#FF0000', '#0000FF', slices));

  function enableMouseEvents(path, label) {

    path
      .on('mouseover', (d, i) => {

        // update arc
//         const p = Math.round((d.srcElement.__data__.endAngle - d.srcElement.__data__.startAngle) / (2 * Math.PI) * 10000) / 100;
        const p = Math.round(d.srcElement.__data__.value / total * 10000) / 100
        const l = labels[(d.srcElement.__data__.index)];
        d3.selectAll('path.arc')
          .filter(e => e.index !== d.srcElement.__data__.index)
        const currentArc = d3.selectAll('path.arc')
          .filter(e => e.index === d.srcElement.__data__.index);
        currentArc
          .transition()
          .duration(10)
          .style('opacity', 0.5);
        
        // update label
        const lpos = arcGen.centroid({startAngle:currentArc.data()[0].startAngle, endAngle:currentArc.data()[0].endAngle, })
        label
          .style('left', `${radius + lpos[0] - 35}px`)
          .style('top', `${radius + lpos[1] - 12}px`)
          .style('text-align', 'center')
          .attr('text-anchor', 'middle')
          .html(`<p>${l} ${p}%</p>`);
        label.transition()
          .duration(10)
          .style('opacity', 1);
      })

      path
      .on('mouseout', (d, i) => {
        // update arc
        const currentArc = d3.selectAll('path.arc')
          .filter((e) => e.index === d.srcElement.__data__.index);
        currentArc
          .transition()
          .duration(10)
          .style('opacity', 1);
        
        // update label
        label.transition()
          .duration(10)
          .style('opacity', 0);
      })
      
  }

  function disableMouseEvents(path, label) {
    // disable hover effects during pie chart entry and exit traansitions
    path
      .on('mouseover', (d, i) => d.preventDefault)
    path
      .on('mouseout', (d, i) => d.preventDefault)
    path
      .style('opacity', 1);
    label
      .style('opacity', 0);
  }

  function enterData(group, label, data, duration=500) {

    console.log("d " + duration);

    const gData = group.selectAll('g.slice').data(data);

    // clear any old data
    gData.exit()
      .remove();

    // enter new data
    const gUpdate = gData
      .enter()
      .append('g')
      .attr('class', 'slice');

    // update arcs with data
    const path = gUpdate
      .append('path')
      .merge(gData.select('path.arc'))

    // render arcs
    path
      .attr('class', 'arc')
      .attr('fill', (d, i) => colorGen(i))
      .transition()
      .duration(duration)
      .attrTween('d', (d) => {
        let i = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t) {
          return arcGen(i(t));
        }
      })
      .on('end', () => {enableMouseEvents(path, label)});
  }

  function exitData(group, label, afterFn) {
    // exit old data
    const path = group.selectAll('g.slice').select('path.arc');
    disableMouseEvents(path, label);
    path
      .transition()
      .duration(500)
      .attrTween('d', (d) => {
        var i = d3.interpolate(d, {startAngle: 2*Math.PI, endAngle: 2*Math.PI});
        return function(t) {
          return arcGen(i(t));
        }
      })
      .on('end', afterFn);

  }

  const prevData = usePrevious(pieGen(props.data));

  const graphDataIsEqual = (g1, g2) => {
    if (g1.length !== g2.length)
      return false;
    let arcsEqual = true;
    for(let i = 0; i < g1.length; i++) {
      if(g1[i].value !== g2[i].value) 
        arcsEqual = false;
    }
    return arcsEqual;
  } 


  useEffect(() => {
    // hook called every time data is updated

    const data = pieGen(props.data);
    const group = d3.select(gref.current);
    const label = d3.select(lref.current);

    if (prevData != null && graphDataIsEqual(data, prevData) && props.size != null) {
      // no data transition, new props graph is identical to current one
      enterData(group, label, data, 0);
    }
    else if (group.selectChildren().empty()) {
      // no exit animation if there is no previous chart data
      enterData(group, label, data);
    }
    else if (props.data === null || props.data === undefined) {
      exitData(group, label, () => {console.log('data exit');})
    }
    else {
      exitData(group, label, () => {enterData(group, label, data)} )
    }
  }, [props.data, props.size]); 

  return (
    <svg width={props.size} height={props.size}>
      <g ref={gref} transform={`translate(${radius}, ${radius})`} />
    </svg>
  );
}

export default PieSvg;
