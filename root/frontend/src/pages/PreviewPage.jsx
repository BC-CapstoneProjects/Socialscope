import React from 'react';
import styled from 'styled-components'
import PreviewTable from '../components/Table/PreviewTable';

const displayFieldNames = {
  platform: 'Platform',
  positive_votes: 'Likes',
  comment_count: 'Comments'
}


const PreviewPage = () => {
  return(
    <>
      <PreviewTable 
        posts={undefined}
        displayFields={displayFieldNames}
      />
    </>
  )
}

export default PreviewPage;