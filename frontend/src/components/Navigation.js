import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';



export default function Navigation() {
  return (
   
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Webber</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">        
            </Nav>
            <Nav>
              <Nav.Link href="/login-page">Sign-in</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



  )
}
