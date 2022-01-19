import '../App.css';
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import React, { Component } from 'react'
import Preview from '../pages/preview';
import Graph from '../pages/graph';
import Download from '../pages/download';



class Pagedownload extends Component {
  render() {
    return (

       <Router>
       <div className="App">
           <div className="App-header">
          
              <div > 
                  <Link class="preview-position" to="/preview">Preview</Link> 
               </div>
              <div>
                   <Link   className="graph-position"to="/graph">Graph</Link>
              </div>
              <div >
                    <Link className="download-position"to="/download">Download</Link>
              </div>
     
          </div>
          <div className="optiondiv">
               <h6>Options:</h6>
               <div className="formatdiv">Format</div>
                  <div className="csvbutton2">
                     <div class="dropdown">
                                <button  class=" csvbutton dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    CSV
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Comments</a>
                                        <a class="dropdown-item" href="#">Comments</a>
                                        <a class="dropdown-item" href="#">Comments</a>
                                </div>
                            </div> 
                </div>

                    <div className="checkbox">
                        <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label class="form-check-label" for="flexCheckDefault">
                                Include Sentiment Scores
                                </label>
                        </div>
                    </div>
                    <div className="checkbox2">
                        <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label class="form-check-label" for="flexCheckDefault">
                                Include Search Metadata
                                </label>
                        </div>
                    </div>
                    
          </div>
          
          <button class="download"><i class="fa fa-download"></i> Download</button>
         
       <Routes>
            <Route exact path='/download' element={< Download />}></Route>
            <Route exact path='/preview' element={< Preview />}></Route>
            <Route exact path='/graph' element={< Graph />}></Route>
       </Routes>
       </div>
    </Router>
        
      
   );
  }
}
 
export default Pagedownload;