    import React from 'react';
import styled from 'styled-components'

import LaunchButton from './LaunchButton';

const TitleContainer = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  justify-content: space-between; 
  margin: 0 1rem;

  @media screen and (max-width: 750px) {
    min-width: 250px;
    align-items: center;
    text-align: center;
  }
`;

const TitleSpacer = styled.div`
  flex: 0.2;
`

const TitleSection = () => {
  return (
    <TitleContainer>

        <h1>
          Welcome to Socialscope
        </h1>

        <TitleSpacer/>

        <h3>
          Social media analytics made easy
        </h3>

        <LaunchButton />

      </TitleContainer>
  );
}

export default TitleSection;