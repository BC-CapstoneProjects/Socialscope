import React from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import ContentContainer from '../components/ContentContainer'
import InputButton from '../components/Input/InputButton'
import InputField from '../components/Input/InputField';
import InputContainer from '../components/Input/InputContainer';

const SectionTitle = styled.h2`
  text-align: center;
  text-decoration: underline;
`;

const FilterContainer = styled.div`
  
`

const LaunchButtonContainer = styled.div`
  display:flex;
  justify-content:center;
`

const LaunchButton = styled(InputButton)`
  
`

const ProgressBar = styled.div`
  
`



const SearchPage = () => {

  const navigate = useNavigate();

  const searchRedirect = (e) => {
    e.preventDefault();
    navigate('../results/preview');
  }

  return (
    <ContentContainer>
      <SectionTitle>Search</SectionTitle>
      <FilterContainer>

      </FilterContainer>
      <LaunchButtonContainer>
        <LaunchButton onClick={searchRedirect} width='200px'>
          Launch Search
        </LaunchButton>
      </LaunchButtonContainer>
      <ProgressBar></ProgressBar>

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