
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from "react-bootstrap";

function Checkbox()
{
    return(
        <Form>
           
            {['checkbox'].map(() => (
                <div>
                  
                        <div className='checkbox'>
                            <Form.Check
                            
                                id='Include Sentiment Scores'
                                label="Include Sentiment Scores"
                            />
                        </div>
                        <div className='checkbox'>
                            <Form.Check
                                id='Include Search Metadata'
                                label="Include Search Metadata"
                            />
                       </div>
                  
                </div>
            ))}
        </Form> 
    )
}
export default Checkbox;