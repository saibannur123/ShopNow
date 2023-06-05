import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Store } from '../Context/storeContext'
import { useContext, useEffect} from 'react'


export default function Navigation() {

  const {state, dispatch} = useContext(Store);

  return (
   
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">ShopNow</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">       
            </Nav>
            <Nav>
              <Nav.Link>Cart {state.cart.length > 0 ?<span className="cartNumber">{state.cart.length}</span> : ""}</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login-page">Sign in</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



  )
}
