import React from "react";
import {Form} from "react-bootstrap";

function MaxResult(props)
{
    return (
        <div>
            <div>
                <Form.Label><b>Max Result</b></Form.Label>
            </div>
            <Form className='form-control-1'>
                <Form.Group className="mb-3" >
                    <Form.Control
                        value={props.search}
                        onChange={(e) => props.func(e.target.val)}
                        type="input"
                        placeholder="Enter a number"
                    />
                </Form.Group>
            </Form>
        </div>

    )
}
export default MaxResult