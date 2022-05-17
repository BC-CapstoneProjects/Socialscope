import React, {useState, useEffect}from 'react';
import { useLocation } from 'react-router-dom';
import PreviewTable from '../components/Table/PreviewTable';

const PreviewPage = (props) => {

  const displayFieldNames = {
    platform: 'Platform',
    positive_votes: 'Likes',
    comment_count: 'Comments'
  }

  return(
    <>
      <PreviewTable 
        posts={(props.HistoryData.result !== undefined ? props.HistoryData.result.posts : undefined)}
        displayFields={displayFieldNames}
      />
    </>
  )
}

export default PreviewPage;