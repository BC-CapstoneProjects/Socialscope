import React from 'react';
import styled from 'styled-components';
import { FiShare, FiDelete } from 'react-icons/fi';

import { TableContainer, TableHeadContainer, TableBodyContainer, 
  HeadRow, HeadCell, HeadText, 
  TableRow, TableCell } from '../TableStyledComponents';

const ButtonContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;

`

const SwitchButton = styled(FiShare)`
  transform: rotate(90deg);
  height: 1.5rem;
  width: 1.5rem;
  pointer-events: all !important;  // force override default react-icons/fi styling
  
  &:hover {
    stroke: ${props => props.theme.colors.tertiary_focus};
  }

`

const DeleteButton = styled(FiDelete)`
  height: 1.5rem;
  width: 1.5rem;
  pointer-events: all !important;
  
  &:hover {
    stroke: ${props => props.theme.colors.tertiary_focus};
  }

`

function dateToFormattedString(date) {
  if (!(date instanceof Date)) {
    return null;
  }
  const timezoneOffset = date.getTimezoneOffset();
  let dateNoTimezoneOffset = new Date(date.getTime() - (timezoneOffset*60000));
  const formattedDateString = dateNoTimezoneOffset.toISOString().substring(0,10);
  return formattedDateString;
}

const HistoryTable = (props) => {

  function renderHead() {
    const headLabels = [
      'Query',
      'Date',
      'View',
      'Delete'
    ]
    return(
      <HeadRow>
        {
          headLabels.map((label, index) => (
            <HeadCell key={index}>
              <HeadText>
               {label}
              </HeadText>
           </HeadCell>
        ))}
      </HeadRow>
    );
  }

  function renderBody() {
    if(props.results == null || props.results.historyList == null || props.results.historyList.length === 0)
      return(<TableRow style={{margin: "20px"}}>No history available.  Please make a search first</TableRow>)
    return(props.results.historyList.map((result, index) => (
      <TableRow key={index} className={'data-row ' + ((index % 2 === 0) ? 'dark-shade' : 'light-shade')}>
        <TableCell>
          {result.meta.query}
        </TableCell>
        <TableCell>
          {dateToFormattedString(new Date(result.meta.time * 1000))}
        </TableCell>
        <TableCell>
          <ButtonContainer>
            <SwitchButton onClick={() => {
              props.changeCurrentResult(result); 
              props.navigatePreview();
            }}/>
          </ButtonContainer>
        </TableCell>
        <TableCell>
          <ButtonContainer>
            <DeleteButton onClick={() => {
              props.removeResult(result);
            }}/>
          </ButtonContainer>
        </TableCell>
      </TableRow>
    )));
  }

  return(
    <TableContainer>
      <TableHeadContainer>
        {renderHead()}
      </TableHeadContainer>
      <TableBodyContainer>
        {renderBody()}
      </TableBodyContainer>
    </TableContainer>
  );
}

export default HistoryTable;