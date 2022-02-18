import React, { useEffect, useState } from 'react';

import GraphingMenu from '../components/GraphingMenu';
import PieChart from '../components/Graph/Pie/PieChart';
import LineChart from '../components/Graph/Line/LineChart';

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

  const lineTestData = [{name:'l1', items:[{x:1, y:2}, {x:2, y:4}, {x:3, y:5}, {x:5, y:11}, {x:6, y:12}]}, 
    {name:'l2',items:[{x:1, y:2}, {x:4, y:9}, {x:5, y:7}, {x:6, y:9}]},
    {name:'l3',items:[{x:1, y:-2}, {x:2, y:3}, {x:5, y:2},{x:6, y:2}]},
    {name:'l4',items:[{x:1, y:1}, {x:2, y:7}, {x:3, y:8},{x:6, y:-2}]}];

  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData(generateData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return(
    <>
      <div>Graph page content placeholder</div>
      <PieChart data={graphData} width={500} height={500} />
      <LineChart data={lineTestData} structure={{width: 450, height: 450, margin: 50, padding: 10}} />   
      <GraphingMenu /> 
    </>
  );
}
  
export default GraphPage;