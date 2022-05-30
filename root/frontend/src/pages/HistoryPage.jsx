import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import ContentContainer from '../components/ContentContainer'
import HistoryTable from "../components/Table/History/HistoryTable";
import UploadSection from "../components/UploadSection";

const SectionTitle = styled.h2`
  text-align: center;
  text-decoration: underline;
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
      <UploadSection addResult={props.addResult}/>
    </ContentContainer>
  );
}

export default HistoryPage;