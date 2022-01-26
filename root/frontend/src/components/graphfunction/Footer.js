
import 'bootstrap/dist/css/bootstrap.min.css';


function Footer()
{
    return(
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
    )
}
export default Footer;