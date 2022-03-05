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
  min-width: 200px;
  max-width: 750px;
  margin: 0 auto;
`

const FilterContainerInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FilterRowFull = styled.div`
  flex: 1 0 100%;
`

const FilterRowHalf = styled.div`
  flex: 1 0 50%;
`

const ResetButtonContainer = styled.div`
  display:flex;
  justify-content:flex-end;
  min-width: 200px;
`

const LaunchButtonContainer = styled.div`
  margin-top: 2rem;
  display:flex;
  justify-content:center;
  min-width: 200px;
`


const ProgressBarContainer = styled.div`
  margin: 4rem 0 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProgressBarMarginSpacer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  min-width: 100px;
`

const ProgressBar = styled.div`
  margin: 0 1rem 0 1rem;
  flex: 4;
  display: block;
  height: 1rem;
  width: 100%;
  max-width: 500px;
  min-width: 200px;
  background-color: ${props => props.theme.colors.secondary};
`

const SearchPage = (props) => {

  const [keyword, setKeyword] = useState("");
  const [max, setMax] = useState("");
  const [twitterCheck, setTwitterCheck] = useState(false);
  const [redditCheck, setRedditCheck] = useState(false);
  const [youtubeCheck, setYoutubeCheck] = useState(false);
  const [startDate, setStartDate] = useState(""); //MM-DD-YYYY
  const [endDate, setEndDate] = useState("");

  const {
    result,
    setResult
  } = props;

  const navigate = useNavigate();

  function searchRedirect(e){
    e.preventDefault();
    fetch(`/api/?keyword=${keyword}&twitterChoose=${twitterCheck}&redditChoose=${redditCheck}&youtubeChoose=${youtubeCheck}&maxResults=${max}&start=${startDate}&end=${endDate}`)
        .then(res => res.json())
        .then(res => {
          res.posts.forEach(post => {
            
            try {
            post.title = decodeURIComponent(escape(atob(post.title)));
            } catch (e) {
              console.log(post.title);
              console.log(e);
            }
            try {
            post.text = decodeURIComponent(escape(atob(post.text)));
            } catch (e) {
              console.log(post.text);
              console.log(e);
            }
          })
          return res;
        })
        .then(
            (result) => {
              setResult(result);
              sessionStorage.setItem('result', result);
              console.log(result);
            },
            (error) => {
              alert(error);
            }
        )
        navigate('../results/preview', {result: result});
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

          <FilterRowFull>
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
          </FilterRowFull>

          <FilterRowHalf>
            <InputContainer label='Start Date' labelWidth='99px' contentWidth="163px">
            <InputField
                name='startDate'
                type='date'
                value={startDate}
                setValue={setStartDate}
            />
            </InputContainer>
          </FilterRowHalf>

          <FilterRowHalf>
            <InputContainer label='End Date' labelWidth='99px' contentWidth="163px">
            <InputField
                name='endDate'
                type='date'
                value={endDate}
                setValue={setEndDate}
            />
            </InputContainer>
          </FilterRowHalf>

          <FilterRowHalf>
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
          </FilterRowHalf>

        </FilterContainerInner>
        
        <ResetButtonContainer>
          <InputButton type='secondary' onClick={() => {console.log('reset triggered')}}>
            Reset Filters
          </InputButton>
        </ResetButtonContainer>

      </FilterContainerOuter>

      <LaunchButtonContainer>
        <InputButton  type='primary' onClick={searchRedirect}>
          Launch Search
        </InputButton>
      </LaunchButtonContainer>

      <ProgressBarContainer>
        <ProgressBarMarginSpacer></ProgressBarMarginSpacer>
        <ProgressBar>progress bar placeholder</ProgressBar>
        <ProgressBarMarginSpacer>
          <InputButton type='tertiary' onClick={() => {console.log('cancel triggered')}}>
            Cancel
          </InputButton>
        </ProgressBarMarginSpacer>
      </ProgressBarContainer>

    </ContentContainer>

  );
}
export default SearchPage;