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
      question: 'helloooooooooooooooooooooooooo?',
      answer: 'thereeeeeeeeeeeeeeeeeeee.'
  },
  {
      question: 'What is this project ',
      answer: 'Socialscope.'
  },
  {
      question: 'How far from here to the moon',
      answer: 'Not sure man.'
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