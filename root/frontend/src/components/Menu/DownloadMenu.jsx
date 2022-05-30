import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';

import InputButton from "../Input/InputButton";
import InputContainer from "../Input/InputContainer";
import InputField from "../Input/InputField";
import { FormContainerInner, FormContainerOuter, FormRowFull } from "./FormCommonComponents";

const DownloadButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  min-width: 200px;
`;

function formatDataExcludeMetadata(data) {
  if (data != null && typeof data === 'object' && !Array.isArray(data) && data["posts"] != null) {
    return data["posts"]; // new json data will be array of posts only
  }
  return data;
}

function formatDataPartitionPlatforms(data) {
  const dataInObjectForm = data != null && typeof data === 'object' && !Array.isArray(data) && data["posts"] != null;   
  let oldPosts = dataInObjectForm ? data["posts"] : data;
  let categorizedPostMap = {};
  oldPosts.forEach((post) => {
    let plat = post["platform"];
    let newPost = {...post};
    delete newPost["platform"];
    if (categorizedPostMap[plat] == null) {
      categorizedPostMap[plat] = [];
    }
    categorizedPostMap[plat].push(newPost);
  })
  let newPosts = []
  Object.keys(categorizedPostMap).forEach((platform) => {
    let platformEntry = {}
    platformEntry[platform] = categorizedPostMap[platform];
    newPosts.push(platformEntry);
  })
  if (dataInObjectForm) {
    let newData = {meta: data.meta, posts: newPosts};
    return newData;
  }
  else {
    return newPosts;
  }
}

const DownloadMenu = (props) => {

  const [fileName, setFileName] = useState("");
  const [hrefData, setHrefData] = useState("");

  const [excludeMeta, setExcludeMeta] = useState('false');  // must be string encoded unfortunately due to how radio buttons store value
  const [partitionPlatforms, setPartitionPlatforms] = useState('false');

  const downloadRef = useRef();

  function updateDownloadData(jsonString) {
    setHrefData("data:text/json;charset=utf-8," + encodeURIComponent(jsonString));
    setFileName("socialscope_data.json");
  }

  function initiateDownload() {
    if (fileName === "socialscope_data.json")
      downloadRef.current.click();
    else
      alert("No data to download!");
  }

  useEffect(() => {
    if (props.result == null) return; // guard against undefined result prop
    let fileData = {...props.result};
    if (excludeMeta === 'true')  // extremely annoying, but radio buttons need string values to work, this is the easiest workaround to prevent many bugs
      fileData = formatDataExcludeMetadata(fileData);
    if (partitionPlatforms === 'true') 
      fileData = formatDataPartitionPlatforms(fileData);
    updateDownloadData(JSON.stringify(fileData));
  }, [props.result, excludeMeta, partitionPlatforms])

  return (
    <FormContainerOuter>

      <h3>Download Options:</h3>

      <FormContainerInner>

        <FormRowFull>
          <InputContainer label='Search Metadata'>
            <InputField
              name='metadata'
              type='radio'
              value='false'
              setValue={(v) => setExcludeMeta(v)}
              checked={excludeMeta === 'false'} 
              label='included'/>
            <InputField
              name='metadata'
              type='radio'
              value='true'
              setValue={(v) => setExcludeMeta(v)}
              checked={excludeMeta === 'true'}
              label='excluded'/>
          </InputContainer>
        </FormRowFull>

        <FormRowFull>
          <InputContainer label='Partition By Platform'>
            <InputField
              name='partition'
              type='radio'
              value='true'
              setValue={(v) => setPartitionPlatforms(v)}
              checked={partitionPlatforms === 'true'}
              label='yes'/>
            <InputField
              name='partition'
              type='radio'
              value='false'
              setValue={(v) => setPartitionPlatforms(v)}
              checked={partitionPlatforms === 'false'} 
              label='no'/>
          </InputContainer>
        </FormRowFull>

      </FormContainerInner>

      <DownloadButtonContainer>
        <InputButton type='primary' onClick={initiateDownload}>Download</InputButton>
        <a ref={downloadRef} href={hrefData} download={fileName} hidden>upload</a>
      </DownloadButtonContainer>

    </FormContainerOuter>
  );

};

export default DownloadMenu