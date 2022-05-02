
/*import React, { useState } from "react";
import Papa from "papaparse";
import ContentContainer from '../components/ContentContainer'

const HistoryPage = () => {

  const [filename, setFilesname] = useState([]);
  var [jsonData, setJsonData] = useState({});
  var [uploadFile, setUploadFile] = useState({});
  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  const handleChange = e => {
    Papa.parse(e.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const rowsArray = [];
      const valuesArray = [];

      // Iterating data to get column name and their values
      results.data.map((d) => {
        rowsArray.push(Object.keys(d));
        valuesArray.push(Object.values(d));
      });

      // Filtered Column Names
      setTableRows(rowsArray[0]);

      // Filtered Values
      setValues(valuesArray);

    },
  });
    setFilesname(Array.from(e.target.files))
    const fileReader = new FileReader();
  fileReader.readAsText((e.target.files[0]), "UTF-8");
  fileReader.onload = e => {
  console.log("e.target.result", e.target.result);
  setJsonData( JSON.parse(e.target.result));
  setUploadFile(e.target.result);
  };
 
  }; 
  
var fileExtension = ""
return ( 
  <>
    <h1>Upload Json file - Example</h1> 

    <input type="file" 
    name="file" 
    accept=".csv, .json"
  
    onChange={handleChange} />
      {filename.map((file) => ( 
        <p key={file.name}>
         {fileExtension = file.name.split('.').pop()}
         { Selectfunction( fileExtension, jsonData, tableRows, values,uploadFile)}
        </p>
      ))}
         
  </>
); 
}
function Selectfunction( filetype, jsonData, tableRows, values, uploadFile)
{
 
  if(filetype==="csv"){
    return generateCsvData(tableRows, values)
  
  }else if(filetype==="json"){

   return  GenerateJsonData(jsonData, uploadFile)
  }
}

function generatekey(data){
const newData = Object.keys(data).reduce((result, currentKey) => {
  if (typeof data[currentKey] === 'string' || data[currentKey] instanceof String|| 
  typeof data[currentKey] === 'number'|| 
  typeof data[currentKey] === 'boolean') {
    const elementToPush = currentKey;
    result.push(elementToPush);
  } else {
    const nested = generatekey(data[currentKey]);
    result.push(...nested);
  }
  return result;
}, []);
return newData;
}
function generatevalue(data){
  const newData = Object.keys(data).reduce((result, currentKey) => {
    if (typeof data[currentKey] === 'string' || data[currentKey] instanceof String|| 
    typeof data[currentKey] === 'number'|| 
    typeof data[currentKey] === 'boolean') {
      const elementToPush = data[currentKey];
  
      result.push(elementToPush);
    } else {
      const nested = generatevalue(data[currentKey]);
      result.push(...nested);
    }
    return result;
  }, []);
  return newData;
  }

function GenerateJsonData(data, uploadFile) {
const objKeys=generatekey(data)
const objval=generatevalue(data)
 const required = ["platform", "created_at", "post_id", "lang","title", "text", "author_id","positive_votes", "has_embedded_media", "comment_count", "top_comments", "sentiment_score", "sentiment_confidence"];
 const requiredval = ["platform", "created_at", "post_id", "lang","title", "text", "author_id",0, "has_embedded_media", 0, "kj", 0, 0];
if(objKeys.length === required.length  && JSON.stringify( objKeys)===JSON.stringify(required))
 {
        if(objval.length === requiredval.length )
      {
            for( var i = 0; i < objval.length; i++)
            {
                if(typeof objval[i]!== typeof requiredval[i])
                  {
                   
                      return "Please upload the right format"
                  }
          }
          window.localStorage.setItem("File", JSON.stringify(uploadFile));

          return "File uploaded"
       }else{return "length value not the same"}
 }else{return objKeys}
}

function generateCsvData(tableRows, values)
{
  const required = ["platform", "created_at", "post_id", "lang","title", "text", "author_id","positive_votes", "has_embedded_media", "comment_count", "top_comments", "sentiment_score", "sentiment_confidence"];
  const requiredval = ["platform", "created_at", "post_id", "lang","title", "text", "author_id",0, "has_embedded_media", 0, "kj", 0, 0];
  var bool=false
  for(let i=0;i<required.length; i++)
    {
       if(tableRows[i]===required[i]){

       } else{break}
       bool=true
    }

if(bool=true){
    for(let i=0;i<values; i++)
    {
      for(let j=0; j<requiredval; j++)
      {
          if(typeof values[i]!== typeof requiredval[j])
          {
            return false.toString()
          }
          i++
      }
    }
    return "yes"
  }else{return "key error"}

}
export default HistoryPage;
*/

export default class App extends React.Component {
       handleDownloadDoc = fileName => e => {
         // Downloads the file
         const link = document.createElement("a");
         link.download = `${fileName}.json`;
         const blob = new Blob([JSON.stringify({"platform":"wewe",
         "created_at":"asas", 
        "post_id":"efe",
         "lang":"th",
        "title":"rtr",
         "text":"dsdc", 
        "author_id":"asa",
        "positive_votes":3,
         "has_embedded_media":"xzx",
         "comment_count":9, 
        "top_comments":"dda",
         "sentiment_score":5,
         "sentiment_confidence":4
        })], { type: "json" });
         link.href = URL.createObjectURL(blob);
         link.click();
         URL.revokeObjectURL(link.href);
     
        
       };
       render() {
         return (
           <div className="App">
             <button onClick={this.handleDownloadDoc("resultats")}>
               Download
             </button>
           </div>
         );
       }
     }
     
     const rootElement = document.getElementById("root");
     ReactDOM.render(<App />, rootElement);
     