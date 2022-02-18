
function getRgb(hex) {
  // regex based hex string to rgb array conversion.
  let reg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (reg) {
    return [
      parseInt(reg[1], 16),
      parseInt(reg[2], 16),
      parseInt(reg[3], 16)
    ];
  }
  else {
    return null;
  }
}

function getHex(rgbval) {
  // bit shift based rgb array to hex string conversion
  const code =  (rgbval[0] << 16) + (rgbval[1] << 8) + rgbval[2];
  const hex = (code > 0) ? ('#' + code.toString(16)) : '#000000'; 
  return hex;
}

function interpolateRgbPair(c1, c2, frac) {
  let c3 = c1.slice();
  for (let i = 0; i < 3; i++) {
    c3[i] = Math.round(c3[i] + frac*(c2[i] - c1[i]));
  } 
  return c3;
}

const interpolateColors = (c1, c2, steps) => {
  const c1rgb = getRgb(c1);
  const c2rgb = getRgb(c2);
  let colors = [];
  colors.push(c1);
  for (let i = 1; i < steps + 1; i++) {
    colors.push(getHex(interpolateRgbPair(c1rgb, c2rgb, i/(steps+1))));
  }
  colors.push(c2);
  return colors;
}

export default interpolateColors;