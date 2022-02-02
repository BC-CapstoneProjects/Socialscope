import "../assets/css/Download.css"
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '../components/Downloadfunctions/Checkbox.js';
import Downloadbutton from '../components/Downloadfunctions/Downloadbutton.js';
import Dropdown from '../components/Downloadfunctions/Dropdown.js';
import ContentContainer from '../components/ContentContainer'
import React, { useState } from 'react';
import Header from '../components/Header';


function Downloadpage()  { 
  
    return (
<div>
        <ContentContainer>
            <div className="header-g"><Header></Header></div>
            <div className="App">
              
                <div className="optiondiv">
                        <h6>Options:</h6>
                        <div className="formatdiv">Format</div>
                        <div className="csvbutton2">
                            <Dropdown></Dropdown>
                        </div>
                    
                        <Checkbox></Checkbox>

                    </div>
                    <div>
                            <Downloadbutton></Downloadbutton>
                    </div>
                </div>
              
        </ContentContainer>
     </div> 
   );
  }

 
export default Downloadpage;