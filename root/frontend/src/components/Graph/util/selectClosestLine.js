import * as d3 from 'd3';

function selectClosestLine(mousePosition, linePathSelection, xScale, yScale) {
  const distanceThreshold = 20;  // must be at least this close to a line for it to be selected
  let lineDistances = [];
  let linesForDistance = [];
  linePathSelection.each((d, i) => {
    const currentPath = linePathSelection.filter((d2, i2) => i === i2);
    let segmentDistances = [];
    for (let j = 1; j < currentPath.data()[0].items.length; j++) {
      const segStart = [xScale(currentPath.data()[0].items[j-1].x), yScale(currentPath.data()[0].items[j-1].y)];
      const segEnd = [xScale(currentPath.data()[0].items[j].x), yScale(currentPath.data()[0].items[j].y)];
      segmentDistances.push(getDistanceToSegment(mousePosition, segStart, segEnd));
    }
    lineDistances.push(d3.min(segmentDistances)) ;
    linesForDistance.push(currentPath);
  });
  const closestDist = d3.min(lineDistances);
  if (closestDist < distanceThreshold)
    return (linesForDistance[lineDistances.indexOf(closestDist)]);
  else
    return null;
}

function getDistanceToSegment(mousePosition, segStart, segEnd) {
  const a = segStart[1] - segEnd[1];
  const b = segEnd[0] - segStart[0];
  const c = (segEnd[1] * segStart[0]) - (segStart[1] * segEnd[0]) 
  const infiSep = Math.abs(
    (a * mousePosition[0] + b * mousePosition[1] + c) / 
    Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
    );  
  const distCalc = (a, b) => {
    return Math.sqrt(
      Math.pow((a[0] - b[0]), 2) + 
      Math.pow((a[1] - b[1]), 2)
      );
  }  
  const segLen = distCalc(segEnd, segStart);
  const segEndSep = distCalc(mousePosition, segEnd);
  const segStartSep = distCalc(mousePosition, segStart);
  const segClosestSep = Math.sqrt(
    Math.pow(d3.max([segStartSep, segEndSep]), 2) - 
    Math.pow(infiSep, 2)
    );  
  var distance;
  if (segClosestSep > segLen) distance = d3.min([segStartSep, segEndSep]);
  else distance = infiSep;
  return distance;
}

export default selectClosestLine;