import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {  Route, Routes, Link } from "react-router-dom";
import Preview from "../containers/preview";
import Graphpage from "../containers/Graphpage";
import Downloadpage from "../containers/Downloadpage"; 
import ContentContainer from '../components/ContentContainer'
function Header() 
{
    return(
        <ContentContainer>
            <div >
              <div id="header-d">
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
      
            </ContentContainer>
    )
}

export default Header