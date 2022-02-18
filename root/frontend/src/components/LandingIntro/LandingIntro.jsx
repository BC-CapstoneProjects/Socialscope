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

const LandingIntro = () => {
  return (
    <IntroContainer> 
      
      <TitleSection />

      <ImageSection>
        <img src="https://source.unsplash.com/random/800x800/?img=1" />
      </ImageSection>

    </IntroContainer>
  );
}

export default LandingIntro;