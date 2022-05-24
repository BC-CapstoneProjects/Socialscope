import React from 'react';

import { HeadRow, HeadCell, HeadText, SortButtonContainer, SortButton } from '../TableStyledComponents';

const PreviewHead = (props) => {
  
  function renderSortButtons(field) {
    return(
      <SortButtonContainer data-cy='sort-button-container'>
        <SortButton onClick={() => props.sortHandler(field, true)}>{'\u2191'}</SortButton>
        <SortButton onClick={() => props.sortHandler(field, false)}>{'\u2193'}</SortButton>
      </SortButtonContainer>
    );
  }

  function renderHead() {
    let cols = [];
    Object.keys(props.displayFields).forEach(key => cols.push(
      <HeadCell key={key}>
        <HeadText>
          {props.displayFields[key]}
        </HeadText>
        {renderSortButtons(key)}
      </HeadCell> 
    ));
    cols.push(
      <HeadCell key='button'>
        <HeadText>
          Show<br/>text
        </HeadText>
      </HeadCell>
    )
    return(
      <HeadRow>
        {cols}
      </HeadRow>
    );
  }

  return(
    renderHead()
  );

}

export default PreviewHead;