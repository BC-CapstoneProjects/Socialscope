import React, { useEffect, useState } from 'react';

import GraphingMenu from '../components/GraphingMenu';
import PieChart from '../components/Graph/Pie/PieChart';
import LineChart from '../components/Graph/Line/LineChart';

const GraphPage = (props) => {

  let [menuSelections, setMenuSelections] = useState({'graph': '', 'over': '', 'group': ''});

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

  const resultsTest = {"meta":{"query":"bellevue"},"posts":[{"comment_count":359,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1644937612,"title":"Man attacks Bellevue Applebee's employee with meat cleaver over COVID-19 vaccine proof","platform":"reddit","sentiment_confidence":0,"post_id":"t3_st4zxq","top_comments":[],"positive_votes":488,"text":"","poster_id":"t2_3l1oj988","lang":""},{"comment_count":219,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1644513420,"title":"Bellevue passes Manhattan in housing prices","platform":"reddit","sentiment_confidence":0,"post_id":"t3_spbnmg","top_comments":[],"positive_votes":462,"text":"","poster_id":"t2_lmcf2","lang":""},{"comment_count":163,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643682209,"title":"Sticker shock in the Seattle area: Bellevue home sells for nearly $1M over asking price","platform":"reddit","sentiment_confidence":0,"post_id":"t3_shjgvd","top_comments":[],"positive_votes":384,"text":"","poster_id":"t2_53gdj","lang":""},{"comment_count":87,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643788339,"title":"Bellevue University Teacher Quits Job","platform":"reddit","sentiment_confidence":0,"post_id":"t3_siiyq9","top_comments":[],"positive_votes":223,"text":"","poster_id":"t2_wmpuiwi","lang":""},{"comment_count":53,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643820089,"title":"Woman charged with threatening Bellevue gas station employee with gun after she refused to wear mask","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sit70u","top_comments":[],"positive_votes":194,"text":"","poster_id":"t2_316zl","lang":""},{"comment_count":51,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1644719987,"title":"Shiro Kashiba Plans a New Sushi Restaurant in Bellevue","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sr81aw","top_comments":[],"positive_votes":60,"text":"","poster_id":"t2_3gtb4j32","lang":""},{"comment_count":69,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643591931,"title":"Mercer Island and Bellevue Squander Housing Opportunities Near East Link","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sgofa1","top_comments":[],"positive_votes":147,"text":"","poster_id":"t2_76kvzp9g","lang":""},{"comment_count":23,"sentiment_score":"Neutral","has_embedded_media":false,"created_at":1645574654,"title":"I was born in Newport, and grew up on Bellevue Avenue. AMA.","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sz2l8w","top_comments":[],"positive_votes":43,"text":"I\u2019ve been waiting for this show for quite some time, Newport gilded age is my favorite period in history. My dad had a Newport Preservation Society membership and I would take tours of the mansions almost weekly in the summer. We also used to attend events at the mansions for the Newport Classical Music series that is done every year. I even went to a gala at the age of 11 that was hosted at Rosecliff. I would love to answer questions about my hometown, if anyone is interested. I can try to find some old photos, as well. My family comes from a long line of Rhode Islanders, dating back to Mary Dyer (my great many times over grandmother) and the founding of Rhode Island by Roger Williams.","poster_id":"t2_58xlgs78","lang":""},{"comment_count":8,"sentiment_score":"Neutral","has_embedded_media":false,"created_at":1645378341,"title":"City Center Bellevue tower, Bellevue, WA, 1986","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sx6h4h","top_comments":[],"positive_votes":347,"text":"","poster_id":"t2_h78sti7s","lang":""},{"comment_count":9,"sentiment_score":"Neutral","has_embedded_media":false,"created_at":1645730377,"title":"Inside the Bellevue Hotel","platform":"reddit","sentiment_confidence":0,"post_id":"t3_t0izoz","top_comments":[],"positive_votes":171,"text":"","poster_id":"t2_5ie097x3","lang":""}]}

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

  const getTotalLikesPerPlatform = (posts) => {
    let likeMap = [
      {name: 'twitter', index: 0, value: 9}, 
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
      {name: 'twitter', value: []},
      {name: 'reddit', value: []},
      {name: 'youtube', value: []}
    ];
    for (let i = 0; i < posts.length; i++) {
      let mapIndex = commentMap.findIndex((el) => el.name === posts[i]['platform']);
      commentMap[mapIndex].value.push({x: posts[i]['created_at'], y: posts[i]['comment_count']});
    }
    return {type: 'line', entries: commentMap}
  }

  const defaultGraphData = {
    type: 'pie',
    entries: getTotalLikesPerPlatform(resultsTest['posts'])  // props.result['posts']
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setGraphData(generateData());
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const renderChart = (graphData) => {
    if (graphData.type === 'pie')
      return <PieChart data={graphData.entries} width={500} height={500} />
    else if (graphData.type === 'line')
      return <LineChart data={graphData.entries} structure={{width: 450, height: 450, margin: 50, padding: 10}} />

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

  return(
    <>
      <div>Graph page content placeholder</div>
      {renderChart(defaultGraphData)}
      {/* <PieChart data={graphData} width={500} height={500} />
      <LineChart data={lineTestData} structure={{width: 450, height: 450, margin: 50, padding: 10}} />    */}
      <GraphingMenu updateMenuSelections={updateMenuSelections}/> 
    </>
  );
}
  
export default GraphPage;