import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "../pages/Home";
import History from "../pages/History";
import FAQ from "../pages/FAQ";
import Search from "../pages/Search";
function NavBar()
{
    return(
        <BrowserRouter>
            <div>
                <Navbar >
                    <Container>
                        <div>
                            <Navbar.Brand href="#home">Social Scope</Navbar.Brand>
                        </div>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <div className='mx-auto'>
                                <Nav>
                                    <div className='me-5'>
                                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                    </div>
                                    <div className='me-5'>
                                        <Nav.Link as={Link} to='/search'>Search</Nav.Link>
                                    </div>
                                    <div className='me-5'>
                                        <Nav.Link as={Link} to='/history'>History</Nav.Link>
                                    </div>
                                    <div className='me-5'>
                                        <Nav.Link as={Link} to='/faq'>FAQ</Nav.Link>
                                    </div>
                                </Nav>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Routes>
                    <Route path='/home' element={<Home/>}/>
                </Routes>
                <Routes>
                    <Route path='/history' element={<History/>}/>
                </Routes>
                <Routes>
                    <Route path='/search' element={<Search/>}/>
                </Routes>
                <Routes>
                    <Route path='/faq' element={<FAQ/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default NavBar