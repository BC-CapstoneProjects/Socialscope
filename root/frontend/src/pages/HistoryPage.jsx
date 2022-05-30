import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import ContentContainer from '../components/ContentContainer'
import HistoryTable from "../components/Table/History/HistoryTable";

const SectionTitle = styled.h2`
    font-size: 3rem;
    text-align: center;
    text-decoration: underline;
    
    @media screen and (max-width: 450px) {
      font-size: 2rem;
    }
`;

const HistoryTableContainer = styled.div`
    margin-top: 2rem;
`

const HistoryPage = (props) => {

  const navigate = useNavigate();

  function navigatePreview() {
    navigate('../results/preview');
  }

  return (
    <ContentContainer>
      <SectionTitle>History</SectionTitle>
      <HistoryTableContainer>
        <HistoryTable navigatePreview={navigatePreview} {...props} />
      </HistoryTableContainer>
    </ContentContainer>
  );
}

export default HistoryPage;