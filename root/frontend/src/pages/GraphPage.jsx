import React, { useEffect, useState } from 'react';

import GraphingMenu from '../components/GraphingMenu';
import PieChart from '../components/Graph/Pie/PieChart';
import LineChart from '../components/Graph/Line/LineChart';

const GraphPage = (props) => {

  let [menuSelections, setMenuSelections] = useState({'graph': '', 'over': '', 'group': ''});
  let [graphData, setGraphData] = useState(null);

  // const generateData = (length) => {
  //   if (length === undefined) {
  //     length = 2 + Math.random() * 10;
  //   }
  //   let out = []
  //   for (let i = 0; i < length; i++) {
  //     out.push({index: i, value: (10 + Math.random() * 90)});
  //   }
  //   return out;
  // }

  
  // const lineTestData = [{name:'l1', items:[{x:1, y:2}, {x:2, y:4}, {x:3, y:5}, {x:5, y:11}, {x:6, y:12}]}, 
  //   {name:'l2',items:[{x:1, y:2}, {x:4, y:9}, {x:5, y:7}, {x:6, y:9}]},
  //   {name:'l3',items:[{x:1, y:-2}, {x:2, y:3}, {x:5, y:2},{x:6, y:2}]},
  //   {name:'l4',items:[{x:1, y:1}, {x:2, y:7}, {x:3, y:8},{x:6, y:-2}]}];

  // let [graphData, setGraphData] = useState(generateData());


  // const dataFormulator = (posts, platforms, dataCollector, dataBundler, initialValue = 0) => {
  //   let dataMap = [];
  //   platforms.forEach(el => dataMap.push({name: el, value: initialValue}));
  //   for (let i = 0; i < posts.length; i++) {
  //     dataMap = dataCollector(posts[i], i, dataMap);
  //   }
  //   return dataBundler(dataMap);
  // }

  // const pieDataBundler = (dataMap) => {
  //   return {type: 'pie', entries: dataMap.filter(el => el.value > 0)}
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setGraphData(generateData());
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const getTotalLikesPerPlatform = (posts) => {
    let likeMap = [
      {name: 'twitter', index: 0, value: 0}, 
      {name: 'reddit', index: 1, value: 0}, 
      {name: 'youtube', index: 2, value: 0}
    ];
    for (let i = 0; i < posts.length; i++) {
      let mapIndex = likeMap.findIndex((el) => el.name === posts[i]['platform']);
      likeMap[mapIndex].value = likeMap[mapIndex].value + posts[i]['positive_votes'];
    }
    likeMap = likeMap.filter((el) => el.value > 0)
    return likeMap;
  }
  
  const getCommentsOverTimePerPlatform = (posts) => {
    let commentMap = [
      {name: 'twitter', items: []},
      {name: 'reddit', items: []},
      {name: 'youtube', items: []}
    ];
    for (let i = 0; i < posts.length; i++) {
      let mapIndex = commentMap.findIndex((el) => el.name === posts[i]['platform']);
      commentMap[mapIndex].items.push({x: posts[i]['created_at'], y: posts[i]['comment_count']});
    }
    for (let i = 0; i < commentMap.length; i++) {
      if (commentMap[i].items.length < 2) {
        commentMap.splice(i, 1);
        i--;  // account for removal offset
      }
      else {
        commentMap[i].items.sort((a, b) => {
          if (a.x > b.x) return 1;
          else if (a.x <= b.x) return -1;
        });
      }
    }
    return commentMap;
  }

  const renderChart = (graphData) => {
    if (graphData == null) {
      return;
    }
    else if (graphData.type === 'pie')
      return <PieChart data={graphData.entries} width={500} height={500} />
    else if (graphData.type === 'line')
      return <LineChart data={graphData.entries} dtype={'date'} structure={{width: 450, height: 450, margin: 50, padding: 10}} />

  }

  const updateMenuSelections = (graph, over, group) => {
    let sel = {...menuSelections};
    if (graph != null)
      sel['graph'] = graph;
    if (over != null)
      sel['over'] = over;
    if (group != null)
      sel['group'] = group;
    setMenuSelections(sel);
  }

  useEffect(() => {
    if (menuSelections.graph === 'Likes' && menuSelections.over === 'All' && menuSelections.group ==='Platform') {
      setGraphData({
        type: 'pie',
        entries: getTotalLikesPerPlatform(props.result['posts'])
      }); // props.result['posts']
    }
    else if (menuSelections.graph === 'Comments' && menuSelections.over === 'Time' && menuSelections.group ==='Platform') {
      setGraphData({
        type: 'line',
        entries: getCommentsOverTimePerPlatform(props.result['posts'])
      });
    }
  }, [menuSelections]);

  return(
    <>
      <div>Graph page content placeholder</div>
      {renderChart(graphData)}
      {/* <PieChart data={graphData} width={500} height={500} />
      <LineChart data={lineTestData} structure={{width: 450, height: 450, margin: 50, padding: 10}} />    */}
      <GraphingMenu updateMenuSelections={updateMenuSelections}/> 
    </>
  );
}
  
export default GraphPage;