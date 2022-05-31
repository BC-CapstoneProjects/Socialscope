import ContentContainer from '../components/ContentContainer'
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiMinus } from 'react-icons/fi';

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  height: 100%;
  padding: 20px;
`;

const Wrap = styled.div`
  background: ${props => props.theme.colors.tertiary_dark};
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  min-width: 150px;
  text-align: center;
  cursor: pointer;
  border-radius: 15px;
  transition: background-color 0.2s;
  &:hover{
    background:  ${props => props.theme.colors.tertiary_focus};
  }
  h1 {
    flex-basis: 0;
    flex-grow: 1;
    min-width: 0;
    padding: 1.5rem;
    font-size: 1.5rem;
  }
  span {
    min-width: 0;
    margin-right: 1.5rem;
  }
  @media screen and (max-width: 750px) {
    width: 85%;
  }
  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

const Dropdown = styled.div`
  background: ${props => props.theme.colors.secondary};
  color: #000000;
  width: 70%;
  padding: ${props => props.active ? "1rem 0.5rem" : "0rem 0.5rem"};
  min-width: 150px;
  height: ${props => props.height};
  opacity: ${props => props.active ? 1 : 0};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.outline};
  border-radius: 15px;
  transition: ${props => props.active ? 'height, padding, opacity' : 'opacity, height, padding'};
  transition-delay: ${props => props.active ? '0s, 0s, 0.5s' : '0s, 0.2s, 0.2s'};
  transition-duration: ${props => props.active ? '0.5s, 0.5s, 0.2s' : '0.2s, 0.5s, 0.5s'};
  p {
    visibility: ${props => props.active ? 'visible' : 'hidden'};
    word-wrap: break-all;
    font-size: 1.25rem;
  }
`;

const FaqData = [
  {
      question: 'What is Socialscope?',
      answer: 'Socialscope is a simple social media impressions analyser, developed as an academic project by Andrew, Gihane and Thien.  It interfaces with third party social media apis to search for posts that relate to a key word or phrase of your choice.'
  },
  {
    question: 'Who can benefit from Socialscope the most?',
    answer: 'This application is very simple, small scale, and free, which makes it ideal for individuals or small buisnesses who want to quickly gather a basic understanding of what the internet thinks about a topic, without wasting time searching multiple sites manually or spending money on an enterprise grade tool with needing most of it\'s features.'
  },
  {
    question: 'Are there limits to how many searches I can make?',
    answer: 'Unfortunately yes.  Since this application relies on free tier api access to the social media platforms it searches, users cannot collectively exceed the rate limits of those apis.  This equates to approximately no more than 60 searches per minute, 900 searches per minute, 100k searches per month, across all users.  This is an extremely rough estimation however, and depends on sentiment analysis settings, how many results a search returns, what platforms are searched, etc.'
  },
  {
      question: 'What kind of data does a search retrieve?',
      answer: 'When you make a search, you will get a list of relevant posts and their associated positive votes, comment count, creation date, textual body, and a sentiment score.'
  },
  {
      question: 'How is sentiment score calculated?',
      answer: 'Sentiment analysis is a complex field in natural language processing.  In this project, the textual content of a post is sent to Google\'s natural language processing api, which utilizes advanced lexical algorithms to calculate a score and a confidence value for the sentiment of each post.'
  },
  {
    question: 'How can I access a search that I previously made',
    answer: 'After making a search, the results are saved in your browser.  You can go back to the results of that search via the history page, accessed from the navigation bar.  This history is not saved across browsers or devices however, and the best way to save history data long term is by downloading your results.'
  },
  {
    question: 'How do I download the results of a search?',
    answer: 'After making a search or viewing a previous search from the history menu, you can navigate to the download menu, optionally change a few formatting details, and download the raw data retrieved by a search in a JSON file.'
  },
];

const FaqPage = () => {
    const [clicked, setClicked] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);  // state used to force rerender on window resize so dropdown height is recalculated and animated

    const accordionRef = useRef();

    const toggle = index => {
      console.log();
      if (clicked === index) {
          //if clicked question is already active, then close it
          return setClicked(null);
      }

      setClicked(index);
    };

    useEffect(() => {  // scroll to clicked element after deploy animation finished
      if (clicked != null) {
        setTimeout(() => accordionRef.current.children.item(2*clicked + 1).scrollIntoView(), 500)
      }
    }, [clicked])

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    })

    const calcDropdownHeight = index => {  // find the height dropdown # index should be based on the height of its child paragraph element
      const paddingHeight = 16
      return accordionRef.current.children.item(2*index + 1).children.item(0).scrollHeight + (2 * paddingHeight);
    }

    return (

        <ContentContainer>
            <h2 style={{textAlign: "center", textDecoration: "underline"}}>Frequently Asked Questions</h2>
            <AccordionSection ref={accordionRef}>
              {FaqData.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Wrap onClick={() => toggle(index)}>
                      <h1>{item.question}</h1>
                      <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                    </Wrap>
                    <Dropdown windowWidth={windowWidth} active={clicked === index} height={clicked === index ? calcDropdownHeight(index) + 'px' : '0px'}>
                      <p>{item.answer}</p>
                    </Dropdown>
                  </React.Fragment>
                );
              })}
            </AccordionSection>
        </ContentContainer>
    );
};

export default FaqPage;