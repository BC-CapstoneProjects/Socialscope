import React, {useState} from 'react';
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

const SearchBar = styled(InputContainer)`
  font-size: 1.2rem;
  margin: 3rem auto 3rem auto;
  height: 40px;
  width: 100%;
  max-width: 550px;
  min-width: 210px;

  @media screen and (max-width: 450px) {
    margin: 1.5rem auto 1.5rem auto;
  }
`

const FilterContainerOuter = styled.div`
  max-width: 750px;
  margin: 0 auto;
`

const FilterContainerInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 592px;
`

const ResetButtonContainer = styled.div`
  display:flex;
  justify-content:flex-end;
`

const LaunchButtonContainer = styled.div`
  display:flex;
  justify-content:center;
`

const LaunchButton = styled(InputButton)`
  margin-top: 2rem;
`


const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ProgressBar = styled.div`
  display: block;
  margin: 4rem 1rem 1rem 1rem;
  height: 1rem;
  width: 100%;
  max-width: 500px;
  min-width: 200px;
  background-color: ${props => props.theme.colors.secondary};
`

const SearchPage = (props) => {

  // const [keyword, setKeyword] = useState("");
  // const [max, setMax] = useState("");
  // const [isCheckedTwitter, setIsCheckedTwitter] = useState(false);
  // const [isCheckedReddit, setIsCheckedReddit] = useState(false);
  // const [isCheckedYoutube, setIsCheckedYoutube] = useState(false);
  // const [startDate, setStartDate] = useState(undefined);
  // const [endDate, setEndDate] = useState(undefined);
  // const [result, setResult] = useState(undefined);

  const {
    twitterCheck,
    redditCheck,
    youtubeCheck,
    setTwitterCheck,
    setRedditCheck,
    setYoutubeCheck,
    keyword,
    setKeyword,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    max,
    setMax,
    result,
    setResult
  } = props;

  const navigate = useNavigate();

  function searchRedirect(e){
    // e.preventDefault();
    fetch(`http://localhost:8080/?keyword=${keyword}&twitterChoose=${twitterCheck}&redditChoose=${redditCheck}&youtubeChoose=${youtubeCheck}&maxResults=${max}&start=${startDate}&end=${endDate}`)
        .then(res => res.json())
        .then(
            (result) => {
              setResult(result);
              // const count = Object.keys(result).length;
              // console.log(count);
              alert(JSON.stringify(result));
            },
            (error) => {
              alert(error);
            }
        )
    navigate('../results/preview');
  }

  return (
    <ContentContainer>
      
      <SectionTitle>Search</SectionTitle>

      <SearchBar label='Query'>
        <InputField
            name='query'
            type='text'
            value={keyword}
            setValue={setKeyword}
            placeholder='Key word or phrase'/>
      </SearchBar>

      <FilterContainerOuter>

        <h3>
          Filters:
        </h3>

        <FilterContainerInner>

          <InputContainer label='Platforms'>
            <InputField
                name='twitter'
                type='checkbox'
                value={twitterCheck}
                setValue={setTwitterCheck}
                label='twitter'/>
            <InputField
                name='reddit'
                type='checkbox'
                value={redditCheck}
                setValue={setRedditCheck}
                label='reddit'/>
            <InputField
                name='youtube'
                type='checkbox'
                value={youtubeCheck}
                setValue={setYoutubeCheck}
                label='youtube'/>
          </InputContainer>

          <InputContainer label='Start Date' labelWidth='99px' contentWidth="163px">
            <InputField
                name='startDate'
                type='date'
                value={startDate}
                setValue={setStartDate}
            />
          </InputContainer>

          <InputContainer
              label='End Date' labelWidth='99px' contentWidth="163px">
            <InputField
                name='endDate'
                type='date'
                value={endDate}
                setValue={setEndDate}
            />
          </InputContainer>

          <InputContainer label="Max Results" labelWidth='99px' contentWidth="163px">  {/* A bit hacky double width setting for now */}
            <InputField
                name="maxResults"
                type="text"
                key="loaded"
                value={max}
                setValue={setMax}
                defaultValue="20"
                width='153px'/>
          </InputContainer>

        </FilterContainerInner>
        
        <ResetButtonContainer>
          <InputButton onClick={() => {console.log('reset triggered')}}>
            Reset Filters
          </InputButton>
        </ResetButtonContainer>

      </FilterContainerOuter>

      <LaunchButtonContainer>
        <LaunchButton
            onClick={searchRedirect}
            width='200px'>
          Launch Search
        </LaunchButton>
      </LaunchButtonContainer>

      <ProgressBarContainer>
        <ProgressBar>progress bar placeholder</ProgressBar>
      </ProgressBarContainer>

    </ContentContainer>

  );
}

export default SearchPage;