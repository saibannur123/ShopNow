import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Store } from '../Context/storeContext'
import { useContext, useEffect} from 'react'


export default function Navigation() {

  const {state, dispatch} = useContext(Store);

  const logOut = () => {
    dispatch({type: "SIGN_OUT"});
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("token");
    window.location.href = "/login-page"
    
    
  }

  return (
   
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">ShopNow</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">       
            </Nav>
            <Nav>
              { <Nav.Link href="/cart" >Cart {state.cart.cartItems.length > 0 ?<span className="cartNumber">{state.cart.cartItems.length}</span> : ""}</Nav.Link> }
            </Nav>
            <Nav>
              
             {!state.userInfo ? <Nav.Link href="/login-page">Sign in</Nav.Link> : 
             
             <NavDropdown title={state.userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
             </NavDropdown>}
            </Nav>
          </Navbar.Collapse>
        </Container>
    {
      console.log("HI", state)
    }
      </Navbar>



  )
}
