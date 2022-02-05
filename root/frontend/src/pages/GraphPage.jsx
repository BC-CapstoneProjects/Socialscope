import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

import PieChart from '../components/Graph/PieChart';

const GraphPage = () => {


  const testData = {a: 1, b: 2, c:3, d:6};
  const nullData = {a: 0, b: 0, c:0, d:0};

  let [graphData, setGraphData] = useState(nullData);

  useEffect(() => {
    const interval = setInterval(() => setGraphData(testData), 10000);
    return () => clearInterval(interval);
  }, [])

  return(
    <>
      <div>Graph page content placeholder</div>
      <PieChart data={graphData} size={500} />
    </>
  );
}
  
export default GraphPage;