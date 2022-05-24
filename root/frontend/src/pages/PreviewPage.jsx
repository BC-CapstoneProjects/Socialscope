import React from 'react';
import PreviewTable from '../components/Table/Preview/PreviewTable';

const PreviewPage = (props) => {

  const displayFieldNames = {
    platform: 'Platform',
    positive_votes: 'Likes',
    comment_count: 'Comments'
  }

  return(
    <>
      <PreviewTable 
        posts={((props != null && props.result != null) ? props.result.posts : undefined)}
        displayFields={displayFieldNames}
      />
    </>
  )
}

export default PreviewPage;