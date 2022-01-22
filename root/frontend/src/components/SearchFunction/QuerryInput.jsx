import React from "react";
import {Form} from "react-bootstrap";

function QuerryInput(props)
{
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label><b>Something to search</b></Form.Label>
                    <Form.Control
                        value={props.search}
                        onChange={(e) => props.func(e.target.val)}
                        type="input"
                        placeholder="keyword or phrase"
                    />
                </Form.Group>
            </Form>
        </div>

    )
}
export default QuerryInput