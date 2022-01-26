import React from "react";
import {Col, Form, Row} from "react-bootstrap";
function Choose()
{
    return(
        <div>
            <h5 className='page-title'>Filter</h5>
            <Form>
                <Form.Label><b>Platform</b></Form.Label>
                <div>
                    {['checkbox'].map(() => (
                        <div className='al-choose'>
                            <Row>
                                <Col>
                                    <Form.Check
                                        id='twitter'
                                        label="Twitter"
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        id='youtube'
                                        label="YouTube"
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        id='reddit'
                                        label="Reddit"
                                    />
                                </Col>
                            </Row>
                        </div>
                    ))}
                </div>
            </Form>
        </div>
    )
}
export default Choose