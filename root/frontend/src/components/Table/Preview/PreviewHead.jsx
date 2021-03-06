import React from 'react';
import styled from 'styled-components';

import { HeadRow, HeadCell, HeadText } from '../TableCommonComponents';

const SortButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SortButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  margin: 1px;
  height: 20px;
  width: 20px;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary_dark};
  }
`;

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