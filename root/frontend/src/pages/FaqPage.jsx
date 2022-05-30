import ContentContainer from '../components/ContentContainer'
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiMinus } from 'react-icons/fi';

const SectionTitle = styled.h2`
    font-size: 3rem;
    text-align: center;
    text-decoration: underline;
    
    @media screen and (max-width: 450px) {
      font-size: 2rem;
    }
`;

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  height: 500px;
  padding: 20px;
`;

const Wrap = styled.div`
  // background: ${props => props.theme.colors.tertiary_dark};
  background: #1976D2;
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
    background:  #2196F3;
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
  
  @media screen and (max-width: 450px) {
     h1 {
        padding: 0.75rem;
        font-size: 0.8rem;
     }
  }
`;

const Dropdown = styled.div`
    background: ${props => props.theme.colors.secondary};
    //background: #8ED1FC;
    color: #000000;
    width: 70%;
    min-width: 150px;
    height: ${props => props.active ? "100px" : "0px"};
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
    
    @media screen and (max-width: 450px) {
        height: ${props => props.active ? "80px"  : "0px"};
        p {
            text-align: center;
            font-size: 0.8rem;
        }
    }
`;

const FaqData = [
    {
        question: 'Who are we?',
        answer: 'We are three ambitious students at Bellevue College who want to bring a cool searching application to users.'
    },
    {
        question: 'What technology is used to make Socialscope?',
        answer: 'Searching API from Reddit, YouTube, Twitter and ReactJS, NodeJS, Java, SpringBoot, Google NLP, AWS.'
    },
    {
        question: 'How much does it cost to use Socialscope?',
        answer: 'Totally free!'
    },
    {
        question: 'Do you sell my personal information? If yes, how do I revoke permission from doing so?',
        answer: 'Since we do not require user to register for using Socialscope, therefore, we do not sell personal information.'
    }
    ,
    {
        question: 'Is there any updates coming up in the future?',
        answer: 'While our users use Socialscope, we will collect there opinions and then we will use it for updating application.'
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
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <AccordionSection>
              {FaqData.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Wrap onClick={() => toggle(index)}>
                      <h1>{item.question}</h1>
                      <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                    </Wrap>
                    {/*<Dropdown active={clicked === index} height={"100px"}>*/}
                    <Dropdown active={clicked === index}>
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