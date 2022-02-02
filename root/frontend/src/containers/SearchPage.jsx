import React from 'react';
import "../assets/css/Search.css"
import ContentContainer from '../components/ContentContainer'
import Choose from "../components/SearchFunction/Choose.jsx";
import {Button, Col, Container, Row} from "react-bootstrap";
import QuerryInput from "../components/SearchFunction/QuerryInput.jsx";
import MaxResult from "../components/SearchFunction/MaxResult.jsx";
import DateChoose from "../components/SearchFunction/DateChoose.js";
import Progressbar from "../components/SearchFunction/Progressbar.jsx";
import {Route, Routes, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
const SearchPage = () => {
    return (
        <ContentContainer>
            <div>
                <div className='pd-top-2'>
                    <h1 className='page-title'>Search</h1>
                    <div>
                        <Container>
                            <div className='boxed'>
                                <QuerryInput/>
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
                                            <DateChoose></DateChoose>
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
                                        <Button variant="secondary">Reset</Button>
                                    </div>
                                </Row>
                            </div>
                            <br>
                            </br>
                            <Row>
                                <div className='pd-launch-button'>
                                <div className='me-5 '>
                                       <Link to="/Header" className="btn btn-primary">Launch Search</Link>
                                 </div>

                                </div>
                            </Row>
                            <Row> 
                                <Col>
                                    <div>
                                        <Progressbar></Progressbar>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <div className='pd-launch-cancel'>
                                    <Button variant="secondary">Cancel</Button>
                                </div>
                            </Row>
                        </Container>
                    </div>
                    <Routes>
                        <Route path='/Header' element={<Header/>}/>
                    </Routes> 
                </div>
            </div>
        </ContentContainer>
    );
}

export default SearchPage;