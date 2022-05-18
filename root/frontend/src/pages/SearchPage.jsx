import React, {useState, useEffect} from 'react';
import styled, { keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom';

import ContentContainer from '../components/ContentContainer'
import InputButton from '../components/Input/InputButton'
import InputField from '../components/Input/InputField';
import InputContainer from '../components/Input/InputContainer';
import {SpinnerDotted} from "spinners-react";

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
    margin: 1rem auto 1rem auto;
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
  // grid: 2;
  // display: grid;
  justify-content: space-between;
  min-width: 100px;
`

const ProgressBar = styled.div`
  margin: 0 1rem 0 1rem;
  flex: 4;
  display: block;
  height: 1.2rem;
  width: 100%;
  border-radius: 5px;
  max-width: 500px;
  min-width: 200px;
  background-color: ${props => props.theme.colors.secondary};
`

function blinkingEffect() {
    return keyframes`
    50% {
      opacity: 0;
    }
  `;
}

const AnimatedComponent = styled.div`
  animation: ${blinkingEffect} 2s linear infinite;
`

const SearchPage = (props) => {

  const [keyword, setKeyword] = useState("");
  const [max, setMax] = useState("");
  const [twitterCheck, setTwitterCheck] = useState(false);
  const [redditCheck, setRedditCheck] = useState(false);
  const [youtubeCheck, setYoutubeCheck] = useState(false);
  const [startDate, setStartDate] = useState(""); //MM-DD-YYYY
  const [endDate, setEndDate] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [checkNavigate, setCheckNavigate] = useState(true);
  const {
    result,
    setResult
  } = props;

  const navigate = useNavigate();

  function refreshInput(e)
  {
      setKeyword("");
      setStartDate("");
      setMax("");
      setEndDate("");
      setTwitterCheck(false);
      setRedditCheck(false);
      setYoutubeCheck(false);
  }

  async function searchRedirect(e){
    e.preventDefault();
    setVisibility(true);
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
            res => {
              setResult(res);
              sessionStorage.setItem('result', JSON.stringify(res));
              return res
            },
            error => {
              alert(error);
              const resultsTest = {"meta":{"query":"bellevue"},"posts":[{"comment_count":359,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1644937612,"title":"Man attacks Bellevue Applebee's employee with meat cleaver over COVID-19 vaccine proof","platform":"reddit","sentiment_confidence":0,"post_id":"t3_st4zxq","top_comments":[],"positive_votes":488,"text":"","poster_id":"t2_3l1oj988","lang":""},{"comment_count":219,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1644513420,"title":"Bellevue passes Manhattan in housing prices","platform":"reddit","sentiment_confidence":0,"post_id":"t3_spbnmg","top_comments":[],"positive_votes":462,"text":"","poster_id":"t2_lmcf2","lang":""},{"comment_count":163,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643682209,"title":"Sticker shock in the Seattle area: Bellevue home sells for nearly $1M over asking price","platform":"reddit","sentiment_confidence":0,"post_id":"t3_shjgvd","top_comments":[],"positive_votes":384,"text":"","poster_id":"t2_53gdj","lang":""},{"comment_count":87,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643788339,"title":"Bellevue University Teacher Quits Job","platform":"reddit","sentiment_confidence":0,"post_id":"t3_siiyq9","top_comments":[],"positive_votes":223,"text":"","poster_id":"t2_wmpuiwi","lang":""},{"comment_count":53,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643820089,"title":"Woman charged with threatening Bellevue gas station employee with gun after she refused to wear mask","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sit70u","top_comments":[],"positive_votes":194,"text":"","poster_id":"t2_316zl","lang":""},{"comment_count":51,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1644719987,"title":"Shiro Kashiba Plans a New Sushi Restaurant in Bellevue","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sr81aw","top_comments":[],"positive_votes":60,"text":"","poster_id":"t2_3gtb4j32","lang":""},{"comment_count":69,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643591931,"title":"Mercer Island and Bellevue Squander Housing Opportunities Near East Link","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sgofa1","top_comments":[],"positive_votes":147,"text":"","poster_id":"t2_76kvzp9g","lang":""},{"comment_count":23,"sentiment_score":"Neutral","has_embedded_media":false,"created_at":1645574654,"title":"I was born in Newport, and grew up on Bellevue Avenue. AMA.","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sz2l8w","top_comments":[],"positive_votes":43,"text":"I\u2019ve been waiting for this show for quite some time, Newport gilded age is my favorite period in history. My dad had a Newport Preservation Society membership and I would take tours of the mansions almost weekly in the summer. We also used to attend events at the mansions for the Newport Classical Music series that is done every year. I even went to a gala at the age of 11 that was hosted at Rosecliff. I would love to answer questions about my hometown, if anyone is interested. I can try to find some old photos, as well. My family comes from a long line of Rhode Islanders, dating back to Mary Dyer (my great many times over grandmother) and the founding of Rhode Island by Roger Williams.","poster_id":"t2_58xlgs78","lang":""},{"comment_count":8,"sentiment_score":"Neutral","has_embedded_media":false,"created_at":1645378341,"title":"City Center Bellevue tower, Bellevue, WA, 1986","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sx6h4h","top_comments":[],"positive_votes":347,"text":"","poster_id":"t2_h78sti7s","lang":""},{"comment_count":9,"sentiment_score":"Neutral","has_embedded_media":false,"created_at":1645730377,"title":"Inside the Bellevue Hotel","platform":"reddit","sentiment_confidence":0,"post_id":"t3_t0izoz","top_comments":[],"positive_votes":171,"text":"","poster_id":"t2_5ie097x3","lang":""}]}
              setResult(resultsTest);
              sessionStorage.setItem('result', JSON.stringify(resultsTest));
            }
        )
        .then(res => {
              //finishLoad();  // issue: set state is reinstantiating the loadstate object, losing the progress made in useEffect intervals
            if(checkNavigate === true) {
                navigate('../results/preview')
            }
            }
        );
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
            <InputButton type='secondary' onClick={refreshInput}>
              Reset Filters
            </InputButton>
          </ResetButtonContainer>

        </FilterContainerOuter>

        <LaunchButtonContainer>
          <InputButton type='primary' onClick={searchRedirect}>
            Launch Search
          </InputButton>
        </LaunchButtonContainer>
        {visibility && (
            <ProgressBarContainer>
                <ProgressBarMarginSpacer></ProgressBarMarginSpacer>
                <AnimatedComponent style={{marginRight: "30px"}}>Start collecting data and analyzing...</AnimatedComponent>
                <SpinnerDotted size={67} thickness={150} speed={80} color="rgba(172, 136, 57, 1)" style={{marginRight: "30px"}}/>
                <ProgressBarMarginSpacer>
                    <InputButton type='tertiary' onClick={() => {
                        setResult(undefined);
                        console.log("triggered");
                        setVisibility(false);
                        setCheckNavigate(false);
                    }}>
                        Cancel
                    </InputButton>
                </ProgressBarMarginSpacer>
            </ProgressBarContainer>
        )}
      </ContentContainer>
  );
}
export default SearchPage;
