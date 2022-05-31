import styled from 'styled-components';

const FormContainerOuter = styled.div`
min-width: 200px;
max-width: 750px;
margin: 0 auto;
`

const FormContainerInner = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`

const FormRowFull = styled.div`
flex: 1 0 100%;
`

const FormRowHalf = styled.div`
  flex: 1 0 50%;
`

export { FormContainerOuter, FormContainerInner, FormRowFull, FormRowHalf }