import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import InputButton from './Input/InputButton';

const UploadSectionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  padding: 0 10%;

  @media screen and (max-width: 450px) {
    margin-top: 0.5rem;
    padding: 0;
  }
`

const UploadVerticalFlex = styled.div`
  display: flex;
  flex-direction: column;
`

const UploadButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  gap: 0.5rem;
`

const UploadMessageContainer = styled.div`
  min-height: 1.1rem;
  padding-right: 5px;
  margin: 10px 0;
`

const UploadMessage = styled.div`
  text-align: right;
  font-weight: bold;

  &.error {
    color: darkred;
  }
`


async function readFile(file) {
  const text = await file.text();
  return text;
}

const UploadSection = (props) => {

  const [uploadMode, setUploadMode] = useState(false);
  const [fileContents, setFileContents] = useState("");
  const [uploadMessageData, setUploadMessageData] = useState({error: false, message: ""});
  const inputRef = useRef();

  async function processUpload() {
    try {
      let data = JSON.parse(fileContents);
      const dataInObjectForm = data != null && typeof data === 'object' && !Array.isArray(data) && data["posts"] != null
      const postsPartitioned = dataInObjectForm ? Object.keys(data["posts"][0]).length === 1 : Object.keys(data[0]).length === 1;
      let result = {};
      if (!dataInObjectForm) {
        const dummyMetaInfo = {
          query: "[Unknown: raw data upload]",
          time: Math.round((new Date()).getTime() / 1000)
        }
        result["meta"] = dummyMetaInfo;
      }
      else {
        result["meta"] = data["meta"];
      }
      let uploadedPosts = dataInObjectForm ? data["posts"] : data;
      if (postsPartitioned) {
        result["posts"] = [];
        uploadedPosts.forEach(platformPartition => {
          const currentPlatform = Object.keys(platformPartition)[0]
          const postList = platformPartition[currentPlatform]
          postList.forEach(post => {
            const postInserting = {...post, platform: currentPlatform}
            result["posts"].push(postInserting);
          })
        });
      }
      else {
        result["posts"] = uploadedPosts;
      }
      props.addResult(result);
      setUploadMessageData({
        error: false,
        message: "Upload successful!"
      })
      setUploadMode(false);
    }
    catch (ex) {
      console.log(ex.message);
      cancelUploadWithError("Unable to process file contents.");
    }
  }

  async function cancelUpload() {
    setFileContents("");
    setUploadMode(false)
    setUploadMessageData({
      error: false,
      message: "Upload cancelled."
    });
  }

  async function cancelUploadWithError(text) {
    setUploadMessageData({
      error: true,
      message: text
    })
    setFileContents("");
    setUploadMode(false);
  }

  async function updateFileContents(evnt) {
    if (evnt.target.files == null || evnt.target.files.length !== 1) {
      cancelUploadWithError("Please select one file to upload.");
      return;
    }
    setUploadMode(true);
    const contents = await readFile(evnt.target.files[0])
    const name = await evnt.target.files[0].name;
    setUploadMessageData({
      error: false,
      message: "selected:  " + name
    })
    setFileContents(contents);
  }

  function triggerUpload() {
    inputRef.current.click();
  }

  return (
    <UploadSectionContainer>
      <UploadVerticalFlex>
        <UploadMessageContainer>
          <UploadMessage className={uploadMessageData.error ? "error" : "no-error"}>
            {uploadMessageData.message}
          </UploadMessage>
        </UploadMessageContainer>
        <input ref={inputRef} type='file' hidden onChange={updateFileContents}/>
        <UploadButtonContainer>
          {uploadMode ?
            <>
            <InputButton type='secondary' onClick={processUpload}>Submit</InputButton>
            <InputButton type='secondary' onClick={cancelUpload}>Cancel</InputButton>
            </>
            :
            <InputButton type='secondary' onClick={triggerUpload}>Upload Previous Search</InputButton>
          }
        </UploadButtonContainer>
      </UploadVerticalFlex>
    </UploadSectionContainer>
  );
}

export default(UploadSection);