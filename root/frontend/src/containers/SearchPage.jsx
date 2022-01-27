import React from 'react';

import ContentContainer from '../components/ContentContainer'
import InputField from '../components/InputField';
import InputContainer from '../components/InputContainer';

const SearchPage = () => {
  return (
    <ContentContainer>
      <h1>Search Page Content</h1>
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