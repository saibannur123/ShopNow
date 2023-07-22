import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Store } from "../Context/storeContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Navigation() {

  const { state, dispatch } = useContext(Store); // Accessing the global state and dispatch function from the context
  
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Function to handle the logout process
  const logOut = () => {
    dispatch({ type: "SIGN_OUT" });
    localStorage.removeItem("userInfo"); // Remove user info from local storage
    localStorage.removeItem("cartItems"); // Remove cart items from local storage
    localStorage.removeItem("shippingInfo"); // Remove shipping info from local storage
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login-page"); // Redirect to the login page after logout
  };

  const performSearch = () => {
    navigate(`/search?category=all&query=${search}&rating=all&price=all&option=all&page=1`);
    setSearch("");
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ShopNow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>

          <Nav>
            {
              <Nav.Link as={Link} to="/cart">
                Cart{" "}

                {state.cart.cartItems.length > 0 && (
                  <span className="cartNumber">
                    {state.cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Nav.Link>
            }
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/search">
              View All
            </Nav.Link>
          </Nav>
          <Nav className="me-3">
            {!state.userInfo ? (
              // If the user is not logged in, show the Sign-in link
              <Nav.Link as={Link} to="/login-page">
                Sign in
              </Nav.Link>
            ) : (
              // If the user is logged in, show the user's name in a dropdown menu
              <NavDropdown title={state.userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/orderhistory">
                  Order History
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/change-password">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success" onClick={performSearch}>Search</Button>
          </Form>
          
        </Navbar.Collapse>
        
      </Container>
    </Navbar>

  //   <Navbar bg="dark" data-bs-theme="dark" fixed="top">
  //   <Container>
  //     <Navbar.Brand href="#home">Navbar</Navbar.Brand>
  //     <Nav className="me-auto">
  //       <Nav.Link as={Link} to="/search" >View All</Nav.Link>
  //       <Nav.Link href="#features">Features</Nav.Link>
  //       <Nav.Link href="#pricing">Pricing</Nav.Link>
  //     </Nav>
  //     <Form className="d-flex">
  //           <Form.Control
  //             type="search"
  //             placeholder="Search"
  //             className="me-2"
  //             aria-label="Search"
  //           />
  //           <Button variant="outline-success">Search</Button>
  //         </Form>
  //   </Container>
  // </Navbar>
  );
}
