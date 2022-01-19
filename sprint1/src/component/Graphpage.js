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



class Graphpage extends Component {
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
          <div className="grahpposition">
                  <h3>Graph Display Window</h3>
          </div>
          <div className="App-Footer">
                <div className="graphing-text"><h6>Graphing</h6></div>
                    <div  className="graphing-button"> 
                    
                            <div class="dropdown">
                                <button  class="btn-xl  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Comments
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Comments</a>
                                        <a class="dropdown-item" href="#">Comments</a>
                                        <a class="dropdown-item" href="#">Comments</a>
                                </div>
                            </div> 
                    </div>
                    <div className="groupedby-text"><h6>Grouped By</h6></div>
                    <div  className="groupedby-button"> 
                    
                            <div class="dropdown">
                                <button  class="btn-xl dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Plattform
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Twitter</a>
                                        <a class="dropdown-item" href="#">Youtube</a>
                                        <a class="dropdown-item" href="#">Reddit</a>
                                </div>
                            </div> 
                    </div>     
                    <div className="over-text"><h6>Over</h6></div>
                    <div  className="over-button"> 
                    
                            <div class="dropdown">
                            
                                <button  class=" btn-xl  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                   Time                  
                                </button>
                                 
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">One month</a>
                                        <a class="dropdown-item" href="#">Two months</a>
                                        <a class="dropdown-item" href="#">Three months</a>
                                </div>
                            </div> 
                    </div> 
     
             </div>


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
 
export default Graphpage;