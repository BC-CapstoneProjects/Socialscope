import React from 'react';
import styled from 'styled-components'

const PreviewPage = (props) => {

  return(
    <div>
      {JSON.stringify(props.result)}
    </div>
  )
}

export default PreviewPage;