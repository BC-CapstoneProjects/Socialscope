import React, {useRef, useEffect, useState} from 'react';
import * as d3 from 'd3';

import interpolateColors from '../util/interpolateColors';
import selectClosestLine from '../util/selectClosestLine';

const LineSvg = (props) => {

  const gref = useRef(null);
  const [prevData, setPrevData] = useState([]);
  const data = props.data;
  //  const lref = props.lref;


  const getBufferedDomain = (field, buffer=0) => {
    let mi = d3.min(data[0].items, (d) => d[field]);
    for(let i = 1; i < data.length; i++) {
      let mtemp = d3.min(data[i].items, (d) => d[field]);
      if (mi > mtemp) mi = mtemp;
    }
    let ma = d3.max(data[0].items, (d) => d[field]);
    for(let i = 1; i < data.length; i++) {
      let mtemp = d3.max(data[i].items, (d) => d[field]);
      if (ma < mtemp) ma = mtemp;
    }
    return [mi - buffer, ma + buffer];
  }

  const getTicks = (scale, amount) => {
    let min = scale.domain()[0];
    let max = scale.domain()[1];
    const step = Math.ceil(((max - min) / (amount)));
    return d3.range(min, max + step, step);
  }

  const xScale = d3.scaleLinear()
    .domain(
      getBufferedDomain('x')
    )
    .range([props.structure.padding, props.structure.width - props.structure.padding]);


  const yScale = d3.scaleLinear()
    .domain(getBufferedDomain('y', 2))
    .range([props.structure.height - props.structure.padding, props.structure.padding]);

  const xTicks = 5, yTicks = 5;

  const xAxis = d3.axisBottom(xScale)
    .ticks(xTicks)
    .tickValues(getTicks(xScale, xTicks))
    .tickSize(5)
    .tickPadding(10);

  const yAxis = d3.axisLeft(yScale)
    .ticks(yTicks)
    .tickValues(getTicks(yScale, yTicks))
    .tickSize(props.structure.padding-props.structure.width)
    .tickPadding(5);

  const lineGen = d3.line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))

  const colorGen = d3.scaleOrdinal(interpolateColors('#FF0000', '#0000FF', data.length));

  const formatDate = (date) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
  };

  useEffect(() => {

    if (JSON.stringify(props.data) === JSON.stringify(prevData)) return; // TODO: temporary to skip rerendering for demo pie chart transitions

    const group = d3.select(gref.current);

    group.select('.x-axis').remove();
    group.select('.y-axis').remove();
    group.select('.mouse-group').remove();
    group.select('.overlay').remove();

    const gData = group.selectAll('g.line').data(props.data);

    gData.exit()
      .remove();

    const gX = group
      .append('g');
    gX
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${props.structure.height - props.structure.padding})`)
      .call(xAxis)
    gX.select('.domain').remove();
    gX.selectAll('line')
      .attr('stroke', '#000000')
      .attr('stroke-width', 1)
      .attr('opacity', 0.5);
    const gXtext = gX.selectAll('text')
      .attr('opacity', 0.75)
      .attr('font-size', '0.75rem');
    if (props.dtype === 'date') {
      gXtext.each((d, i) => gXtext.filter((dd, ii) => i === ii).text(formatDate(new Date(parseInt(d) * 1000))));
    }

    const gY = group
      .append('g');
    gY
      .attr('class', 'y-axis')
      .call(yAxis);
    gY.select('.domain').remove();
    gY.selectAll('line')
      .attr('stroke', '#000000')
      .attr('stroke-width', 1)
      .attr('opacity', 0.5);
    gY.selectAll('text')
      .attr('opacity', 0.75)
      .attr('font-size', '0.75rem');

    const gUpdate = gData
      .enter()
      .append('g')
      .attr('class', 'line')

    const path = gUpdate
      .append('path')
      .merge(gData.select('path'))

    var selectedPath = null;

    path
      .attr('fill', 'none')
      .attr('stroke', (d) => colorGen(d))
      .attr('stroke-width', 2)
      .attr('shape-rendering', 'optimizeQuality')
      .attr('d', (d) => lineGen(d.items))
      .attr('pointer-events', 'all')

    path.each((d, i, nodes) => {
      const el = nodes[i];
      const len = el.getTotalLength();
      if(!prevData.includes(d.name)) {
        d3.select(el)
          .attr('stroke-dasharray' , `${len},${len}`)
          .attr('stroke-dashoffset', len)
          .transition()
          .duration(1000)
          .ease(d3.easeLinear)
          .attr('stroke-dashoffset', 0);
      }
    });

//    const legend = d3.select(lref.current);

    const focus = group.append('g')
    focus
      .attr('class','mouse-group')
      .attr('pointer-events', 'none')
      .style('visibility', 'hidden');
    focus.append('circle')
      .attr('r', 5);
    focus.append('text')
      .attr('x', 9)
      .attr('dy', '.35em');

    const overlay = group.append('rect')
    
    overlay
      .attr('class', 'overlay')
      .attr('width', props.structure.width + props.structure.padding)
      .attr('height', props.structure.height + props.structure.padding)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .style('visibility', 'hidden');

    overlay
      .on('mouseover', () => {focus.style('visibility', 'visible')})
      .on('mouseout', () => {focus.style('visibility', 'hidden')})
      .on('mousemove', mouseMoveOverlay);

    function mouseMoveOverlay(e) {
      // find line closest to mouse
      const mousepos = d3.pointer(e, overlay.node())
      const line = selectClosestLine(mousepos, path, xScale, yScale)
      // reset focus and line selection state
      d3.selectAll('.line>path').attr('stroke-width',2)
      focus.style('visibility', 'hidden')
      // customize closest line
      if (line !== null && line !== undefined) {
        const xBisect = d3.bisector(d => d.x).left;
        line.attr('stroke-width', 4)
        // find closest data point to mouse on closest line
        const x0 = xScale.invert(mousepos[0]);
        const dind = data.findIndex(el => el.name === line.data()[0].name)
        const i = xBisect(data[dind].items, x0, 1);
        const d0 = data[dind].items[i-1];
        const d1 = data[dind].items[i];
        let d = (d1 !== undefined && x0 - d0.x > d1.x - x0) ? d1 : d0;
        // move dot to that point
        focus
          .attr('transform', `translate(${xScale(d.x)},${yScale(d.y)})`)
          .style('visibility', 'visible')
        focus.select('text').text(`(${props.dtype === 'date' ? formatDate(new Date(parseInt(d.x) * 1000)) : d.x}, ${d.y})`)
//        legend
//          .style('left', `${xScale(d.x) + 39}px`)
//          .style('top', `${yScale(d.y) + 25}px`)
//          .style('visibility', 'visible')
//          .text(`(${d.x},${d.y})`)
      }
    }

    setPrevData(props.data.map(({name})=> name));

  }, [props.data])

  return (
    <svg width={props.structure.width + 2*props.structure.margin} height={props.structure.height + 2*props.structure.margin}>
      <g ref={gref} transform={`translate(${props.structure.margin + props.structure.padding},${props.structure.margin + props.structure.padding})`}/>
    </svg>
  );
}

export default LineSvg;