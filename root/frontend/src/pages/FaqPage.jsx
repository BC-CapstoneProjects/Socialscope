import ContentContainer from '../components/ContentContainer'
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiMinus } from 'react-icons/fi';

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  height: 500px;
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
`;

const Dropdown = styled.div`
  background: ${props => props.theme.colors.secondary};
  color: #000000;
  width: 70%;
  min-width: 150px;
  height: ${props => props.active ? props.height : "0px"};
  opacity: ${props => props.active ? 1 : 0};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.outline};
  border-radius: 15px;
  transition: height 0.5s , opacity 0.2s;
  p {
    word-wrap: break-all;
    font-size: 1.5rem;
  }
`;

const FaqData = [
  {
      question: 'What do I want to achieve with Socialscope?',
      answer: 'Socialscope collects data and evaluates them to make business decisions or measure performance of social media accounts.'
  },
  {
      question: 'What is this project ',
      answer: 'Socialscope.'
  },
  {
      question: 'Which social media platforms does this tool use?',
      answer: 'Our Application uses Twitter, Reddit and Youtube.'
  },
  {
    question: 'Is this application free?',
    answer: 'Yes, it is free.'
},
{
    question: ' how does Socialscope work?',
    answer: 'No need to sign up! All you need to do is to enter data for your search and Socialscope will do the rest'
},
{
    question: 'Does it  help to create better content?',
    answer: 'Yes, with Socialscope, you will be able to publish content according to your audience interests and level of understanding.'
},
{
  question: 'What are the benefits of social media analysis? ',
  answer: 'Analyze makes us work smarter, not harder. We get insight into what is working on social.'
}
];

const FaqPage = () => {
    const [clicked, setClicked] = useState(false);

    const toggle = index => {
        if (clicked === index) {
            //if clicked question is already active, then close it
            return setClicked(null);
        }

        setClicked(index);
    };

    return (

        <ContentContainer>
            <h2 style={{textAlign: "center", textDecoration: "underline"}}>Frequently Asked Questions</h2>
            <AccordionSection>
              {FaqData.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Wrap onClick={() => toggle(index)}>
                      <h1>{item.question}</h1>
                      <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                    </Wrap>
                    <Dropdown active={clicked === index} height={"100px"}>
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