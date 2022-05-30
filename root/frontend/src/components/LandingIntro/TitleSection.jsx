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

const Header = styled.h1`
  font-size: 3rem;
  
  @media screen and (max-width: 450px) {
    font-size: 1.5rem;
  }
`;

const SubHeader = styled.h3`
  font-size: 2rem;
  
  @media screen and (max-width: 450px) {
    font-size: 1rem;
  }
`;

const TitleSpacer = styled.div`
  flex: 0.2;
`

const TitleEmphasis = styled.span`
  font-weight: bold;
  color: ${props => props.theme.colors.tertiary_dark};
`

const TitleSection = () => {
  return (
    <TitleContainer>
        <Header>
          Welcome to <TitleEmphasis>Socialscope</TitleEmphasis>
        </Header>

        {/*<TitleSpacer/>*/}
        <SubHeader>
          User-friendly, accurate and fast information analysis tool
        </SubHeader>

        <LaunchButton />

      </TitleContainer>
  );
}

export default TitleSection;