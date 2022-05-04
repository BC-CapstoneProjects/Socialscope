/*import React, { useState } from "react";
import Papa from "papaparse";
import ContentContainer from '../components/ContentContainer'
import ReactDOM from "react-dom";

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
        
         { Selectfunction( fileExtension= file.name.split('.').pop(), jsonData, tableRows, values,uploadFile)}
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

function generateCsvData(tableRows, values,uploadFile)
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
            return "Please check the type of the values"
          }
          i++
      }
    }
    window.localStorage.setItem("File", JSON.stringify(uploadFile));

    return "CSV files uploaded"
  }else{return "key error"}

}
export default HistoryPage;

*/







   
     
    /* export default class App extends React.Component {
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
     */
 /*import createHistory from "history/createBrowserHistory";

const history = createHistory();

export default class Page extends React.Component {
  state = {
    value: "",
    query: "",
    data: ["foo", "bar", "test"],
    filteredData: []
  };

  componentDidMount() {
    this.setQuery();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.query !== this.props.match.params.query) {
      this.setQuery();
    }
  }

  setQuery = () => {
    const { query = "" } = this.props.match.params;
    const filteredData = this.state.data.filter(element =>
      element.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ value: query, query, filteredData });
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    history.push(`/${this.state.value}`);
  };

  render() {
    const { value, filteredData } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input value={value} onChange={this.onChange} />
          <input type="submit" value="Search" />
          {filteredData.map(element => <div key={element}> {element} </div>)}
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/:query?" component={Page} />
        </Switch>
      </Router>
    );
  }
}
  */   
/*import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate 
} from "react-router-dom";

const Foo = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={navigate.goBack}>Back</button>
      <p>foo</p>
    </div>
  );
};

const Bar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={navigate.goBack}>Back</button>
      <p>bar</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/foo">foo</Link>
          </li>
          <li>
            <Link to="/bar">bar</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/foo" children={<Foo />} />
          <Route path="/bar" children={<Bar />} />
        </Routes>
      </div>
    </Router>
  );
}*/

/*import React from 'react';
import SearchPage from './SearchPage';
import {useState, useEffect} from 'react';

const ObjectState= () => {
    const [HistoryData, SetHistoryData] =  useState([]);

    const HistorySet = () => {
      SetHistoryData((prevState) => {
           //[...theArray, `Entry ${theArray.length}`];
            const data = {
                ...prevState, 
                Query: "query",
                Time: Date().toLocaleString() ,
                Select:'select'
            }
            return HistoryData
        });
    }

    return(
        <React.Fragment>
            <button onClick= {HistorySet}>
                Store Object
            </button>
            {HistoryData.Query} {HistoryData.Time} {HistoryData.Select} 
        </React.Fragment>
    )
}

export default ObjectState;
*/
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
 //import SearchPage from './SearchPage';
 import PreviewPage from './PreviewPage';
 const HistoryPage = (props) => {
  const [HistoryData, SetHistoryData] =  useState([]);
  const navigate = useNavigate();
   
     const table=[]
     const data = {
      Query: <>{props.keywork}</>,
      Time: Date().toLocaleString(),
      Results: <>{props.result}</>
  }
    table.push(data);

    const someEventHandler = event => {
      navigate('../results/preview');
       <PreviewPage result={table.Results}/>
    };
  return (
    <div>
    <>{props.message}</>
    {table.map(({ Query, Time}) => (
        <p key={Query}> 
        {Query}  
        {Time}  
        { <button
          onClick={() => someEventHandler} >
          Select
       </button>} 
       </p>
      ))}
      
    </div>
  );
}


export default HistoryPage;