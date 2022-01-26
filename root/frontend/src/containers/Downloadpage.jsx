import "../assets/css/Download.css"
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '../components/Downloadfunctions/Checkbox.js';
import Downloadbutton from '../components/Downloadfunctions/Downloadbutton.js';
import Dropdown from '../components/Downloadfunctions/Dropdown.js';



function Downloadpage()  { 
  
    return (

       
       <div className="App">
    
           <div className="optiondiv">
                  <h6>Options:</h6>
                  <div className="formatdiv">Format</div>
                  <div className="csvbutton2">
                      <Dropdown></Dropdown>
                  </div>
               
                  <Checkbox></Checkbox>
               
                <div>
                    <Downloadbutton></Downloadbutton>
                 </div>

                 
            </div>
        </div>
 
        
      
   );
  }

 
export default Downloadpage;