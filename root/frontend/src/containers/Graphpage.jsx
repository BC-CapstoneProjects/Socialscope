import "../assets/css/Graph.css"
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/graphfunction/Footer';
import ContentContainer from '../components/ContentContainer'
import Header from '../components/Header';


function Graphpage()  {
  
    return (

      <ContentContainer>
      <div>
          <div><Header></Header></div>
            <div className="App2">
               <h6>Graph Display Window</h6> 
            </div>
            <Footer></Footer>
          </div>  
       </ContentContainer>
      
   );
  }
 
export default Graphpage;