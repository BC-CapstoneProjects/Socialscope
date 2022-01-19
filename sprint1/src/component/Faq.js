import '../App.css';
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react'




class Faq extends Component {
  render() {
    return (
        <div className="sp">
            <h3>Frequently Asked Questions</h3>

            <div className="qdiv">
            <h6>Question?</h6>
            <div className="ans">Answer goes here.</div>
            </div>
            <div className="qdiv">
            <h6>Question?</h6>
            <div className="ans">Answer goes here.</div>
            </div>
            <div className="qdiv">
            <h6>Question?</h6>
            <div className="ans">Answer goes here.</div>
            </div>
           
        </div>
       
      
   );
  }
}
 
export default Faq;