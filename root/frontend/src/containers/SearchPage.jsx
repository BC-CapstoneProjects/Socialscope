import React from 'react';
import styled from 'styled-components'

import ContentContainer from '../components/ContentContainer'
import InputField from '../components/Input/InputField';
import InputContainer from '../components/Input/InputContainer';

const SectionTitle = styled.div`
  font-size: 2rem;
  margin: 0 0 1rem 0;
  text-align: center;
  text-decoration: underline;
`;

const SearchPage = () => {
  return (
    <ContentContainer>
      <SectionTitle>Search</SectionTitle>
      <InputContainer label="label">
        <InputField name="rad" type='radio' value='test1' label='radiolabel1'/>
        <InputField name="rad" type='radio' value='test2' label='radiolabel2'/>
      </InputContainer>
      <InputContainer label="label2">
        <InputField name="check" type='checkbox' value='test1' label='checklabel1'/>
        <InputField name="check" type='checkbox' value='test2' label='checklabel2'/>
        <InputField name="check" type='checkbox' value='test3' label='checklabel3'/>
        <InputField name="check" type='checkbox' value='test4' label='checklabel4'/>
      </InputContainer>
    </ContentContainer>
  );
}

export default SearchPage;