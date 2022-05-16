import React, {useState, useEffect} from 'react';
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
  visibility: ${props => props.show ? 'visible' : 'hidden'};
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
  height: 1.2rem;
  width: 100%;
  border-radius: 5px;
  max-width: 500px;
  min-width: 200px;
  background-color: ${props => props.theme.colors.secondary};
`

const ProgressBarFill = styled.div`
  margin: none;
  padding: none;
  text-align: right;
  font-size: 1rem;
  height: 100%;
  width: ${props => props.progress}%;
  border-radius: 5px;
  transition: width ${props => props.step}s;
  background-color: ${props => props.theme.colors.outline};
`

const SearchPage = (props) => {

  //const [HistoryData, SetHistoryData] =  useState([]);
  const [keyword, setKeyword] = useState("");
  const [max, setMax] = useState("");
  const [twitterCheck, setTwitterCheck] = useState(false);
  const [redditCheck, setRedditCheck] = useState(false);
  const [youtubeCheck, setYoutubeCheck] = useState(false);
  const [startDate, setStartDate] = useState(""); //MM-DD-YYYY
  const [endDate, setEndDate] = useState("");
  const [loadState, setLoadState] = useState({
    display: false, 
    loading: false, 
    finish: false,
    value: 0, 
    target: 0, 
    step: 0,
    after: undefined
  });

  const {
    result,
    setResult
  } = props;
  const {
    HistoryData,
    SetHistoryData  } = props;

const {
    allKeyword,
    setAllKeyword  } = props;

    const {
      date,
      setDate } = props;
   // setAllKeyword([...allKeyword, keyword]);

    //SetHistoryData([...HistoryData, res]);

  const navigate = useNavigate();

  function triggerLoad(duration, target, steps=10, promise=(new Promise)) {
    while (loadState.loading) {
      console.log('already loading');
      setTimeout(() => {}, 500)
    }
    setLoadState({ 
      ...loadState,
      display: true,
      loading: true,
      finish: false,
      target: target,
      step: ((target - loadState.value) / steps),
      trans: duration / steps,
      after: promise
    })
  }

  function finishLoad() {
    setLoadState({
      ...loadState,
      finish: true
    })
  }

  async function searchRedirect(e){
    e.preventDefault();
    const p = fetch(`/api/?keyword=${keyword}&twitterChoose=${twitterCheck}&redditChoose=${redditCheck}&youtubeChoose=${youtubeCheck}&maxResults=${max}&start=${startDate}&end=${endDate}`)
        .then(res => res.json())
        .then(res => {
          res.posts.forEach(post => {
            try {
            post.title = decodeURIComponent(escape(atob(post.title)));
            } catch (e) {
              console.log(post.title);
              console.log(e);
            }
            setAllKeyword([...allKeyword, keyword])
            setDate(Date().toLocaleString())
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
              SetHistoryData([...HistoryData, res]);
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
          }
        );
    const loadDuration = 3 + (Math.round(1.5 * (parseInt(max) || 0)));
    triggerLoad(loadDuration, 100, 2*loadDuration, p);
  }

  useEffect(() => {
    if (loadState.loading) {
      const interval = setInterval(() => {
        let newState = {...loadState};
        let updateState = false;
        if (loadState.value >= 100) {
          setLoadState({...loadState, loading: false, value: 100});
        }
        else if (loadState.finish) {
          newState={
            ...newState,
            finish: false,
            value: 100
          };
          console.log("load end")
          updateState = true;
        }
        else if (loadState.loading && loadState.value >= loadState.target) {
          newState = {
            ...newState,
            loading: false,
            target: undefined,
            step: undefined
          };
          updateState = true;
        }
        else if (loadState.loading) {
          const initialProgress = loadState.value;
          const newValue = (initialProgress + loadState.step) > 100 ? 100: initialProgress + loadState.step;
          newState = {
            ...newState,
            value: newValue
          };
          console.log("load proceed");
          updateState = true;
        }
        if (updateState) {
          console.log(newState);
          setLoadState(newState);
        }
      }, loadState.trans * 1000)
      return () => clearInterval(interval);
    }
    else if (loadState.value >= 100) {
      loadState.after.then(
        navigate('../results/preview')
      );
    }
  }, [loadState])
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
          <InputButton type='secondary' onClick={() => {
              console.log('reset triggered')
            }}>
            Reset Filters
          </InputButton>
        </ResetButtonContainer>

      </FilterContainerOuter>

      <LaunchButtonContainer>
        <InputButton  type='primary' onClick={searchRedirect}>
          Launch Search
        </InputButton>
      </LaunchButtonContainer>

      <ProgressBarContainer show={loadState.display ? 1 : 0}>
        <ProgressBarMarginSpacer></ProgressBarMarginSpacer>
        <ProgressBar>
          <ProgressBarFill progress={Math.round(loadState.value)} 
            step={loadState.trans && loadState.trans * 2}>
              {Math.round(loadState.value) + '%'}
            </ProgressBarFill>
        </ProgressBar>
        <ProgressBarMarginSpacer>
          <InputButton type='tertiary' onClick={() => {
            console.log('cancel triggered');
            setLoadState({
              ...loadState,
              loading: false,
              value: 0,
            });
          }}>
            Cancel
          </InputButton>
        </ProgressBarMarginSpacer>
      </ProgressBarContainer>

    </ContentContainer>

  );
}
export default SearchPage;