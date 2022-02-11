import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

import PieChart from '../components/Graph/PieChart';

import * as d3 from 'd3';

const GraphPage = () => {

  const generateData = (length) => {
    if (length === undefined) {
      length = 2 + Math.random() * 10;
    }
    let out = []
    for (let i = 0; i < length; i++) {
      out.push({index: i, value: (10 + Math.random() * 90)});
    }
    return out;
  }

  let [graphData, setGraphData] = useState(generateData());


  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData(generateData());
    }, 5000);
    return () => clearInterval(interval);
  }, [])

  return(
    <>
      <div>Graph page content placeholder</div>
      <PieChart data={graphData} width={500} height={500} />
    </>
  );
}
  
export default GraphPage;