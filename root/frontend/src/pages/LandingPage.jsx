import React from 'react';
import styled from 'styled-components'

import ContentContainer from '../components/ContentContainer';
import LandingIntro from '../components/LandingIntro/LandingIntro';

const DescriptionSection = styled.div`
  margin: 0.5rem 0;
  font-size: 1.5rem;
  
  @media screen and (max-width: 450px) {
     font-size: 1rem;
  }
`;

const MiscSection = styled.div`
    margin: 1rem 0;
    font-size: 1rem;
    transition: transform .2s; 
    & ul {
      margin-left: 1.5rem;
    }
    & ol {
      margin-left: 1.5rem;
    }
    & ol li:hover{
      color: #2196F3;
      font-size: 1.3rem;
    }
    @media screen and (max-width: 450px) {
        font-size: 0.5rem;
        & ol li:hover{
        color: #2196F3;
        font-size: 0.6rem;
        }
    }
`;

const Subhead = styled.h4`
  margin: 0.5rem 0;
  font-size: 1.25rem;
  font-weight: normal;
  @media screen and (max-width: 450px) {
     font-size: 0.625rem;
  }
`
const LandingPage = () => {
  return (
    <ContentContainer>
      <LandingIntro />
      <DescriptionSection>
        Want to know what the internet thinks about a topic?  That knowledge is just a few clicks away!
      </DescriptionSection>
      <MiscSection>
        <Subhead>
          What you need to do:
        </Subhead>
        <ol>
          <li>Enter a key phrase</li>
          <li>Set up some optional filters</li>
          <li>Click the search button</li>
          <li>Wait a few moments while we take care of the rest</li>
        </ol>
      </MiscSection>
      <MiscSection>
        <Subhead>
          What you'll gain:
        </Subhead>
        <ul>
          <li>Relevant data from Twitter, Reddit, Youtube, or any combination of the three</li>
          <li>A selection of graphs to give valuable insights into statistical trends</li>
          <li>A topic sentiment score for each post generated by Google's powerful AI</li>
          <li>A downloadable file that contains the results of your search for your convenience</li>
        </ul>
       </MiscSection>
    </ContentContainer>
  );
}

export default LandingPage;