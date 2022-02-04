import React from 'react';
import styled from 'styled-components'
import JSONPretty from 'react-json-pretty';
const PreviewPage = (props) => {

  return(
    <div>
      <JSONPretty id="json-pretty" data={props.result}></JSONPretty>
    </div>
  )
}

export default PreviewPage;