import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Dropdown()
{
    return(

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
    )
}
export default Dropdown;