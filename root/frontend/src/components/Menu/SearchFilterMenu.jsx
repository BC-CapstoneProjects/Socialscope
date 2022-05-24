import React from 'react';
import styled from 'styled-components';

import InputField from '../Input/InputField';
import InputContainer from '../Input/InputContainer';
import InputButton from '../Input/InputButton';

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

const FilterMessageContainer = styled.div`
  min-height: 1.1rem;
  margin: 10px 0;
`

const FilterMessage = styled.div`
  color: darkred;
  text-align: center;
  font-weight: bold;
`

const SearchFilterMenu = (props) => {

  function resetFilters() {
    console.log('resetFilters triggered')
    props.setFilters({
      max: 10,
      twitterCheck: true,
      redditCheck: true,
      youtubeCheck: true,
      sentimentCheck: 'true',
      startDate: '',
      endDate: '',
    })
  }

  function setField(name, value) {
    if (!(typeof(name) ==='string') || props.filters[name] == null) {
      throw new Error('invalid filters field: ' + name);
    }
    let newFilters = {...props.filters};
    newFilters[name] = value;
    props.setFilters(newFilters);
  }

  return(
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
              value={props.filters.twitterCheck}
              checked={props.filters.twitterCheck}
              setValue={(v) => setField("twitterCheck", v)}
              label='twitter'/>
          <InputField
              name='reddit'
              type='checkbox'
              value={props.filters.redditCheck}
              checked={props.filters.redditCheck}
              setValue={(v) => setField("redditCheck", v)}
              label='reddit'/>
          <InputField
              name='youtube'
              type='checkbox'
              value={props.filters.youtubeCheck}
              checked={props.filters.youtubeCheck}
              setValue={(v) => setField("youtubeCheck", v)}
              label='youtube'/>
        </InputContainer>
      </FilterRowFull>

      <FilterRowFull>
      <InputContainer label='Sentiment' labelWidth='99px'>
        <InputField
          name='sentiment'
          type='radio'
          value='true'
          setValue={(v) => setField("sentimentCheck", v)}
          checked={props.filters.sentimentCheck === "true"} 
          label='yes'/>
        <InputField
          name='sentiment'
          type='radio'
          value='false'
          setValue={(v) => setField("sentimentCheck", v)}
          checked={props.filters.sentimentCheck === "false"}
          label='no'/>
      </InputContainer>
    </FilterRowFull>

      <FilterRowHalf>
        <InputContainer label='Start Date' labelWidth='99px' contentWidth="163px">
          <InputField
              name='startDate'
              type='date'
              value={props.filters.startDate}
              setValue={(v) => setField("startDate", v)}
          />
        </InputContainer>
      </FilterRowHalf>

      <FilterRowHalf>
        <InputContainer label='End Date' labelWidth='99px' contentWidth="163px">
          <InputField
              name='endDate'
              type='date'
              value={props.filters.endDate}
              setValue={(v) => setField("endDate", v)}
          />
        </InputContainer>
      </FilterRowHalf>

      <FilterRowHalf>
        <InputContainer label="Max Results" labelWidth='99px' contentWidth="163px">  {/* A bit hacky double width setting for now */}
          <InputField
              name="maxResults"
              type="text"
              key="loaded"
              value={props.filters.max}
              setValue={(v) => setField("max", v)}
              defaultValue="20"
              width='140px'/>
        </InputContainer>
      </FilterRowHalf>

    </FilterContainerInner>

    <ResetButtonContainer>
      <InputButton type='secondary' onClick={resetFilters}>
        Reset Filters
      </InputButton>
    </ResetButtonContainer>

    <FilterRowFull>
      <FilterMessageContainer>
        <FilterMessage data-cy='filter-error-message' visibility={props.filterError === "" ? "hidden" : "visible"}>
          {props.filterError}
        </FilterMessage>
      </FilterMessageContainer>
    </FilterRowFull>

  </FilterContainerOuter>
  );

};

export default SearchFilterMenu;