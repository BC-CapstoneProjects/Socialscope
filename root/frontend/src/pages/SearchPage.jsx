import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import ContentContainer from '../components/ContentContainer';
import SearchFilterMenu from '../components/Menu/SearchFilterMenu';
import ProgressBar from '../components/ProgressBar';
import InputButton from '../components/Input/InputButton'
import InputField from '../components/Input/InputField';
import InputContainer from '../components/Input/InputContainer';


const SectionTitle = styled.h2`  // TODO: extract repeated style
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
    margin: 1rem 0.5rem 1rem auto;
  }
  @media screen and (max-width: 283px) {
    margin-bottom: 2rem;  // pad for box resize
  }
`

const LaunchButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  min-width: 200px;

  @media screen and (max-width: 450px) {
    margin-top: 0.5rem;
  }
`

function invalidDates(startDate, endDate) {
  const latestDate = new Date();
  const earliestDate = new Date(latestDate.getTime());
  earliestDate.setDate(latestDate.getDate() - 7);
  return (startDate.getDate() < earliestDate.getDate() 
    || endDate.getDate() > latestDate.getDate() 
    || startDate.getDate() > endDate.getDate()); 
}

const SearchPage = (props) => {

  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({
    max: 10,
    twitterCheck: true,
    redditCheck: true,
    youtubeCheck: true,  
    sentimentCheck: 'true',  // have to use a string to prevent radio button boolean control errors
    startDate: '',  //YYYY-MM-DD
    endDate: ''
  });
  const [filterError, setFilterError] = useState("");

  const [loadingBarIsVisible, setLoadingBarIsVisible] = useState(false);
  
  const [canNavigate, setCanNavigate] = useState(true);  // is checked before navigation is tried
  const [shouldNavigate, setShouldNavigate] = useState(false);  // when set to true will check canNavigate and attempt navigation

  const [localSearchResult, setLocalSearchResult] = useState(null);  // result of search before updating the history list and navigating
  const {
    setResult
  } = props;

  const navigate = useNavigate();

  async function searchThenRedirect(e){
    e.preventDefault();
    // check if search fields invalid / display appropriate message
    if (keyword.length <= 0 || keyword.length > 200) {
      setFilterError("Search query must be between 1 and 200 characters.");
    }
    else if (filters.twitterCheck === false && filters.youtubeCheck === false && filters.redditCheck === false) {
      setFilterError("At least one platform must be selected.");
    }
    else if (!Number.isInteger(Number(filters.max)) || Number(filters.max).valueOf() < 1 || Number(filters.max).valueOf() > 100) {
      setFilterError("Max results must be a number between 1 and 100.");
    }
    else if (!(filters.startDate === "" && filters.endDate === "") 
        && (filters.startDate === "" || filters.endDate === "" 
        || invalidDates(new Date(filters.startDate), new Date(filters.endDate)))) {
      setFilterError("Dates must be left blank or set to a valid range within the last seven days.")
    }
    // execute search
    else {
      setLoadingBarIsVisible(true);
      setCanNavigate(true);
      fetch('/api/search',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              keyword: keyword,
              doPlatformTwitter: filters.twitterCheck,
              doPlatformReddit: filters.redditCheck,
              doPlatformYoutube: filters.youtubeCheck,
              doSentimentAnalysis: filters.sentimentCheck,
              maxResults: filters.max,
              startDate: filters.startDate,
              endDate: filters.endDate
            })
          })
        .then(res => res.json())
        .then(
          res => {
            res.posts.forEach(post => {
              try {
                post.title = decodeURIComponent(escape(atob(post.title)));  // jenky way to fix some odd issues with text encoding on different platforms
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
          }
        )
        .then(
            res => {
              setLocalSearchResult(res);
            },
            error => {
              console.log(error);
              // window.setTimeout(() => {  // TODO: this is a debug assignment of a hard coded response, remove before final version
              //   const resultsTest = {"meta":{"query":keyword, "time": Math.round((new Date()).getTime() / 1000)},"posts":[{"comment_count":359,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1644937612,"title":"Man attacks Bellevue Applebee's employee with meat cleaver over COVID-19 vaccine proof","platform":"reddit","sentiment_confidence":0,"post_id":"t3_st4zxq","top_comments":[],"positive_votes":488,"text":"","poster_id":"t2_3l1oj988","lang":""},{"comment_count":219,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1644513420,"title":"Bellevue passes Manhattan in housing prices","platform":"reddit","sentiment_confidence":0,"post_id":"t3_spbnmg","top_comments":[],"positive_votes":462,"text":"","poster_id":"t2_lmcf2","lang":""},{"comment_count":163,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643682209,"title":"Sticker shock in the Seattle area: Bellevue home sells for nearly $1M over asking price","platform":"reddit","sentiment_confidence":0,"post_id":"t3_shjgvd","top_comments":[],"positive_votes":384,"text":"","poster_id":"t2_53gdj","lang":""},{"comment_count":87,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643788339,"title":"Bellevue University Teacher Quits Job","platform":"reddit","sentiment_confidence":0,"post_id":"t3_siiyq9","top_comments":[],"positive_votes":223,"text":"","poster_id":"t2_wmpuiwi","lang":""},{"comment_count":53,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643820089,"title":"Woman charged with threatening Bellevue gas station employee with gun after she refused to wear mask","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sit70u","top_comments":[],"positive_votes":194,"text":"","poster_id":"t2_316zl","lang":""},{"comment_count":51,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1644719987,"title":"Shiro Kashiba Plans a New Sushi Restaurant in Bellevue","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sr81aw","top_comments":[],"positive_votes":60,"text":"","poster_id":"t2_3gtb4j32","lang":""},{"comment_count":69,"sentiment_score":"Neutral","has_embedded_media":true,"created_at":1643591931,"title":"Mercer Island and Bellevue Squander Housing Opportunities Near East Link","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sgofa1","top_comments":[],"positive_votes":147,"text":"","poster_id":"t2_76kvzp9g","lang":""},{"comment_count":23,"sentiment_score":"Neutral","has_embedded_media":false,"created_at":1645574654,"title":"I was born in Newport, and grew up on Bellevue Avenue. AMA.","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sz2l8w","top_comments":[],"positive_votes":43,"text":"I\u2019ve been waiting for this show for quite some time, Newport gilded age is my favorite period in history. My dad had a Newport Preservation Society membership and I would take tours of the mansions almost weekly in the summer. We also used to attend events at the mansions for the Newport Classical Music series that is done every year. I even went to a gala at the age of 11 that was hosted at Rosecliff. I would love to answer questions about my hometown, if anyone is interested. I can try to find some old photos, as well. My family comes from a long line of Rhode Islanders, dating back to Mary Dyer (my great many times over grandmother) and the founding of Rhode Island by Roger Williams.","poster_id":"t2_58xlgs78","lang":""},{"comment_count":8,"sentiment_score":"Neutral","has_embedded_media":false,"created_at":1645378341,"title":"City Center Bellevue tower, Bellevue, WA, 1986","platform":"reddit","sentiment_confidence":0,"post_id":"t3_sx6h4h","top_comments":[],"positive_votes":347,"text":"","poster_id":"t2_h78sti7s","lang":""},{"comment_count":9,"sentiment_score":"Neutral","has_embedded_media":false,"created_at":1645730377,"title":"Inside the Bellevue Hotel","platform":"reddit","sentiment_confidence":0,"post_id":"t3_t0izoz","top_comments":[],"positive_votes":171,"text":"","poster_id":"t2_5ie097x3","lang":""}]}
              //   setLocalSearchResult(resultsTest);
              // }, 2000)
            }
        )
    }
    // scroll to page bottom in all cases, better for mobile visibility
    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  useEffect(() => {
    if (localSearchResult != null) {
      setShouldNavigate(true);
    }
    else {
      setShouldNavigate(false);
    }
  }, [localSearchResult])

  useEffect(() => {
    if(loadingBarIsVisible) {
      const scrollingElement = (document.scrollingElement || document.body);
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }
  }, [loadingBarIsVisible])
  
  useEffect(() => {
    if (shouldNavigate && canNavigate) {
      setResult(localSearchResult);
      navigate('../results/preview');
    }
    else if (shouldNavigate) {
      setShouldNavigate(false);
    }
  }, [shouldNavigate, canNavigate, setResult, localSearchResult, navigate]);

  return (
      <ContentContainer>

        <SectionTitle>Search</SectionTitle>

        <SearchBar label='Query'>
          <InputField
              name='query'
              type='text'
              value={keyword}
              setValue={setKeyword}
              placeholder='Enter a key word or phrase...'/>
        </SearchBar>

        <SearchFilterMenu filters={filters} setFilters={setFilters} filterError={filterError}/>

        {loadingBarIsVisible ? 
          <ProgressBar cancelClick={() => {
            setCanNavigate(false);
            setLocalSearchResult(null);
            setLoadingBarIsVisible(false);
            console.log("cancel triggered");
          }}/>
         :
          <LaunchButtonContainer>
            <InputButton type='primary' onClick={searchThenRedirect}>
              Launch Search
            </InputButton>
          </LaunchButtonContainer>
        }
      </ContentContainer>
  );
}
export default SearchPage;
