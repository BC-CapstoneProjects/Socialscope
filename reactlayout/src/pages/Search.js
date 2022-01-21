import React from "react";
import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import Choose from "../component/SearchFunction/Choose";
import QuerryInput from "../component/SearchFunction/QuerryInput";
import SearchDatePicker from "../component/SearchFunction/DatePicker";
import MaxResult from "../component/SearchFunction/MaxResult";
import {Button} from "@mui/material";
function Search()
{
    return(
        <div className='pd-top-2'>
            <h1 className='page-title'>Search</h1>
            <Container>
                <QuerryInput></QuerryInput>
               <Row>
                   <Col>
                       <div>
                           <Choose></Choose>
                       </div>
                   </Col>
               </Row>
                <Row>
                    <Col>
                        <div>
                            <SearchDatePicker></SearchDatePicker>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <MaxResult></MaxResult>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className='pd-reset-button'>
                        <Button variant='outlined'>Reset</Button>{' '}
                    </div>
                </Row>
                <Row>
                    <div className='pd-launch-button'>
                        <Button variant='outlined'>Launch Search</Button>{' '}
                    </div>
                </Row>
                <Row>
                    <div className='pd-top-3'>
                        <ProgressBar animated now={45} />
                    </div>
                </Row>
                <Row>
                    <div className='pd-launch-cancel'>
                        <Button variant='outlined'>Cancel</Button>{' '}
                    </div>
                </Row>
            </Container>

        </div>
    )
}
export default Search