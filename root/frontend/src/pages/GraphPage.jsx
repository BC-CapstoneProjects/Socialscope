import React, { useLayoutEffect, useEffect, useState } from 'react';
import styled from 'styled-components';

import useWindowDimensions from '../hooks/useWindowDimensions';
import GraphingMenu from '../components/GraphingMenu';
import PieChart from '../components/Graph/Pie/PieChart';
import LineChart from '../components/Graph/Line/LineChart';

const GraphicFlex = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;

`;

const GraphicContainer = styled.div`
  width: ${props => props.size};
  overflow-x: ${props => props.scroll ? 'scroll' : 'hidden'};
  overflow-y: hidden;
`

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

const getAmountPerSentimentScore = (posts) => {
  let scoreMap = [
    {name: 'positive', index: 0, value: 0},
    {name: 'neutral', index: 0, value: 0},
    {name: 'negative', index: 0, value: 0}
  ]
  for (let i = 0; i < posts.length; i++) {
    let mapIndex = scoreMap.findIndex((el) => el.name === posts[i]['sentiment_score'].toLowerCase())
    scoreMap[mapIndex].value = scoreMap[mapIndex].value + 1;
  }
  scoreMap = scoreMap.filter((el) => el.value > 0)
  return scoreMap;
}

const renderChart = (graphData, graphWidth) => {
  if (graphData == null || graphWidth == null) {
    return;
  }
  else if (graphData.type === 'pie')
    return <PieChart data={graphData.entries} width={graphWidth} height={graphWidth} />
  else if (graphData.type === 'line')
    return <LineChart data={graphData.entries} dtype={'date'} structure={{width: 400, height: 400, margin: 50, padding: 10}} />

}

const GraphPage = (props) => {

  let [menuSelections, setMenuSelections] = useState({'graph': '', 'over': '', 'group': ''});
  let [graphData, setGraphData] = useState(null);
  let [graphWidth, setGraphWidth] = useState(500);

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

  const {width} = useWindowDimensions();

  useLayoutEffect ( () => {   
    if (width <= 650 && graphWidth >= 500)
      setGraphWidth(300);
    else if (width > 650 && graphWidth < 500) 
      setGraphWidth(500);
}, [width]);

  useEffect(() => {
    if (menuSelections.graph === 'Likes' && menuSelections.over === 'All' && menuSelections.group ==='Platform') {
      setGraphData({
        type: 'pie',
        entries: getTotalLikesPerPlatform(props.result['posts'])
      }); // props.result['posts']
    }
    else if (menuSelections.graph === 'Sentiment' && menuSelections.over === 'All' && menuSelections.group ==='Score') {
      setGraphData({
        type: 'pie',
        entries: getAmountPerSentimentScore(props.result['posts'])
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
      <GraphicFlex>
        <GraphicContainer width={graphWidth} scroll={graphWidth < 500 && graphData && graphData.type === 'line'}>
          {renderChart(graphData, graphWidth)}
        </GraphicContainer>
      </GraphicFlex>
      {/* <PieChart data={graphData} width={500} height={500} />
      <LineChart data={lineTestData} structure={{width: 450, height: 450, margin: 50, padding: 10}} />    */}
      <GraphingMenu updateMenuSelections={updateMenuSelections}/> 
    </>
  );
}
  
export default GraphPage;