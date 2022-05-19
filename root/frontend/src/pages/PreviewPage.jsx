import React, {useState, useEffect}from 'react';
import { useLocation } from 'react-router-dom';
import PreviewTable from '../components/Table/PreviewTable';

const PreviewPage = (props) => {

  const displayFieldNames = {
    platform: 'Platform',
    positive_votes: 'Likes',
    comment_count: 'Comments'
  }
  const {HistoryData, setHistoryData  } = props;
  const {data, setData}=props
  const {name, setName}=props
  if(props.name==="")
  {setData(props.HistoryData[props.HistoryData.length-1].result)
  }
  return(
    <>
      <PreviewTable 
        posts={(props.data!== undefined ? props.data.posts : undefined)}
        displayFields={displayFieldNames}
      />
      {setName=""}
    </>
  )
}

export default PreviewPage;