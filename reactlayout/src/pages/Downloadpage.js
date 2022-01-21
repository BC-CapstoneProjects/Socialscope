import '../App.css';
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '../component/downloadfunctions/Checkbox';
import Downloadbutton from '../component/downloadfunctions/Downloadbutton';
import Dropdown from '../component/downloadfunctions/Dropdown';



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