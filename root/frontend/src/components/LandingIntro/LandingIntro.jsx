import React from 'react';
import styled from 'styled-components'

import TitleSection from './TitleSection';

const IntroContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  width: 100%;
  min-width: 250px;

  @media screen and (max-width: 750px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  max-width: 500px;
  min-width: 250px;
  height: 100%;
  margin: 1.5rem;

`;

const StyledGroup = styled.g`
  fill: ${props => props.theme.colors.outline};
  stroke: none;
`

const LandingSvg = () => {
  return (
    <svg version="1.0"
      viewBox="0 0 820.000000 835.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <StyledGroup transform="translate(0.000000,835.000000) scale(0.100000,-0.100000)">
        <path d="M3165 7944 c-22 -2 -92 -9 -155 -15 -144 -13 -416 -67 -577 -113
        -1153 -336 -2028 -1260 -2267 -2394 -48 -225 -60 -350 -60 -617 0 -258 10
        -370 55 -601 132 -688 537 -1347 1108 -1807 493 -396 1075 -636 1721 -711 177
        -21 558 -21 740 -1 418 47 785 155 1140 336 116 58 313 174 359 210 13 10 27
        19 31 19 4 0 80 -89 171 -197 90 -109 272 -328 404 -488 133 -159 342 -411
        465 -560 123 -148 288 -346 365 -440 146 -175 203 -227 315 -288 228 -124 537
        -110 762 35 78 50 202 176 247 251 182 307 133 689 -120 934 -35 34 -123 108
        -196 165 -140 110 -356 281 -1003 793 -223 176 -460 363 -527 415 -67 52 -122
        98 -123 102 0 4 40 67 89 140 268 404 427 815 498 1293 28 188 25 660 -5 850
        -108 680 -409 1264 -898 1747 -125 123 -223 208 -339 293 -471 348 -1007 560
        -1595 631 -119 14 -521 26 -605 18z m562 -873 c341 -51 650 -162 938 -336 515
        -312 895 -813 1044 -1375 174 -659 27 -1372 -396 -1918 -112 -144 -279 -310
        -438 -434 -247 -193 -602 -357 -935 -432 -248 -55 -299 -60 -575 -61 -290 0
        -383 11 -630 70 -585 140 -1117 519 -1440 1025 -298 466 -415 1038 -319 1570
        82 459 297 865 638 1205 356 355 809 587 1318 676 65 11 162 24 215 29 143 13
        427 3 580 -19z"/>
        <path d="M4145 5879 c-12 -6 -26 -19 -33 -30 -9 -15 -12 -352 -12 -1476 0
        -801 1 -1458 3 -1460 7 -6 179 67 286 122 167 86 350 213 489 340 l72 67 0
        1177 c0 836 -3 1187 -11 1210 -21 60 -31 61 -421 60 -212 0 -361 -4 -373 -10z"/>
        <path d="M1854 5130 c-56 -23 -54 17 -54 -881 l0 -827 101 -88 c130 -115 302
        -231 459 -308 115 -57 258 -116 281 -116 12 0 12 2140 -1 2174 -20 54 -38 56
        -417 55 -191 0 -358 -4 -369 -9z"/>
        <path d="M3013 4403 c-20 -3 -41 -15 -53 -30 -20 -25 -20 -38 -20 -788 l0
        -762 58 -12 c194 -39 559 -37 765 5 l27 6 0 755 c0 698 -1 757 -17 784 -10 17
        -31 33 -48 38 -30 9 -650 12 -712 4z"/>
      </StyledGroup>
    </svg>
  );
}

const LandingIntro = () => {
  return (
    <IntroContainer> 
      
      <TitleSection />

      <ImageSection>
        <LandingSvg />
      </ImageSection>

    </IntroContainer>
  );
}

export default LandingIntro;