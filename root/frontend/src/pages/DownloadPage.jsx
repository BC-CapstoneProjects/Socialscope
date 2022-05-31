import React from 'react';

import DownloadMenu from '../components/Menu/DownloadMenu';

const DownloadPage = (props) => {
    return(
      <>
        <DownloadMenu result={props.result}/>
      </>
    )
  }
  
  export default DownloadPage;