import React, {useState, useEffect, useCallback} from 'react';

import PreviewHead from './PreviewHead';
import PreviewRow from './PreviewRow';
import {TableContainer, TableHeadContainer, TableBodyContainer} from '../TableCommonComponents';

const PreviewTable = (props) => {

  let [rowData, setRowData] = useState(getPostData(props.posts));

  function getPostData(posts) {
    // Get array of processed, row-specific data from posts array
    if (posts === undefined) return undefined;
    return posts.map(e => {
      let re = {}
      re['post'] = e;
      re['descriptionMinimized'] = true;
      return(re);
    });
  }

  function sortRowsByField(by, ascending) {
    if (rowData !== undefined) 
      setRowData(rowData.slice().sort((a, b) => fieldSort(a.post, b.post, by, ascending)));
  }

  function fieldSort(postA, postB, sortBy, sortAscending, sortFields = Object.keys(props.displayFields)) {
    const sortDirection = sortAscending ? 1 : -1;
    if (postA[sortBy] > postB[sortBy]) {
      return sortDirection * 1;
    }
    else if (postA[sortBy] < postB[sortBy]) {
      return sortDirection * -1;
    }
    else if (sortFields.length >=1) {
      // recursive sort next priority field, end of sortFields array has priority
      sortFields.splice(sortFields.indexOf(sortBy), 1)
      return fieldSort(
        postA, 
        postB, 
        sortFields[sortFields.length - 1], 
        sortAscending, 
        sortFields
      );
    }
    else {
      // no fields left to sort, posts completely equal
      return 0;
    }
  }

  function toggleRowDescription(i) {
    let r = rowData.slice();
    r[i].descriptionMinimized = !r[i].descriptionMinimized;
    setRowData(r);
  }

  function renderRows(len) {
    let renderedRows = [];
    if (rowData === undefined) return (<div>no data</div>)
    for(let i=0; i<rowData.length; i++) {
      renderedRows.push(
        <PreviewRow
        key={i}
        number={i}
        data={rowData[i]}
        displayFields={props.displayFields}
        descriptionToggleHandler={() => toggleRowDescription(i)}
        />
      )
    }
    return (
      <>
      {renderedRows}
      </>
    )
  }

  
  const defaultSortCallback = useCallback(() => {
    sortRowsByField(props.sortDefault, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sortDefault])

  useEffect(() => {
    defaultSortCallback();
  }, [props, defaultSortCallback]);

  useEffect(() => {
    setRowData(getPostData(props.posts));
  }, [props.posts])


  return (
    <TableContainer>
        <TableHeadContainer>
          <PreviewHead
            displayFields={props.displayFields}
            sortHandler={sortRowsByField}
          />
        </TableHeadContainer>
        <TableBodyContainer>
          {renderRows((rowData !== undefined) ? rowData.length : 0)}
        </TableBodyContainer>
      </TableContainer>
  );
}

export default PreviewTable;