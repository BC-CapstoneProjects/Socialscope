import React from 'react';
import styled from 'styled-components';

const HeadRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  color: white;
  background-color: ${props => props.theme.colors.outline};
`;

const HeadColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.1rem;
  margin-bottom: 2px;
  text-align: center;
`;


const HeadText = styled.div`
  flex: 1;
`;

const SortButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SortButton = styled.button`
  background: ${props => props.theme.colors.secondary}; // TODO: repeat button style
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  margin: 1px;
  height: 20px;
  width: 20px;
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
      <HeadColumn key={key}>
        <HeadText>
          {props.displayFields[key]}
        </HeadText>
        {renderSortButtons(key)}
      </HeadColumn> 
    ));
    cols.push(
      <HeadColumn key='button'>
        <HeadText>
          Show<br/>text
        </HeadText>
      </HeadColumn>
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