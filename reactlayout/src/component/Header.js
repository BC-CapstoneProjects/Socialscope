import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Preview from "../pages/preview";
import Graphpage from "../pages/Graphpage";
import Downloadpage from "../pages/Downloadpage"; 
import NavBar from "../component/NavBar"; 
function Header() 
{
    return(
        <div>
            <div className="nav2"><NavBar></NavBar></div>
        <BrowserRouter>
    
        <div className="nav">
        
            <div className="App-header">
                <Navbar >
                    <Container>
            
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <div className='mx-auto'>
                                <Nav>
                                    <div className='me-5 preview-position'>
                                        <Nav.Link as={Link} to="/preview">preview</Nav.Link>
                                    </div>
                                    <div className='me-5 download-position'>
                                        <Nav.Link as={Link} to='/Downloadpage'>download</Nav.Link>
                                    </div>
                                    <div className='me-5 graph-position'>
                                        <Nav.Link as={Link} to='/Graphpage'>graph</Nav.Link>
                                    </div>
                                   
                                </Nav>
                            </div>
                        </Navbar.Collapse>
                    </Container> 
                </Navbar>
            </div>
            </div>
            <div>
                <Routes>
                    <Route path='/preview' element={<Preview/>}/>
                </Routes>
                <Routes>
                    <Route path='/Graphpage' element={<Graphpage/>}/>
                </Routes>
                <Routes>
                    <Route path='/Downloadpage' element={<Downloadpage/>}/>
                </Routes> 
              
            </div>
        </BrowserRouter>
        </div>
    )
}

export default Header