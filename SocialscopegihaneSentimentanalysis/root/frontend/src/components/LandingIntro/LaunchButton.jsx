import React from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import InputButton from '../Input/InputButton';

const ButtonContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
margin: 2rem 1rem;
flex: 1;
`;

const ButtonUpperSpacer = styled.div`
flex: 3;
`;

const ButtonLowerSpacer = styled.div`
flex: 1;
`

const LaunchButton = () => {

  const navigate = useNavigate();
  const startRedirect = (e) => {
    e.preventDefault();
    navigate('/search');
  }

  return (
    <ButtonContainer>
      <ButtonUpperSpacer />
        <InputButton type='primary' onClick={startRedirect}>
          Start Here
        </InputButton>
      <ButtonLowerSpacer />
    </ButtonContainer>
  );
}

export default LaunchButton;