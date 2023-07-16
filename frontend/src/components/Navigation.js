import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Store } from "../Context/storeContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navigation() {

  const { state, dispatch } = useContext(Store); // Accessing the global state and dispatch function from the context
  
  const navigate = useNavigate();

  // Function to handle the logout process
  const logOut = () => {
    dispatch({ type: "SIGN_OUT" });
    localStorage.removeItem("userInfo"); // Remove user info from local storage
    localStorage.removeItem("cartItems"); // Remove cart items from local storage
    localStorage.removeItem("shippingInfo"); // Remove shipping info from local storage
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login-page"); // Redirect to the login page after logout
  };

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
          <Nav>
            {/* Conditional rendering based on whether the user is logged in or not */}
            {!state.userInfo ? (
              // If the user is not logged in, show the Sign-in link
              <Nav.Link as={Link} to="/login-page">
                Sign in
              </Nav.Link>
            ) : (
              // If the user is logged in, show the user's name in a dropdown menu
              <NavDropdown title={state.userInfo.name} id="basic-nav-dropdown">
                {/* Links for order history and changing password */}
                <NavDropdown.Item as={Link} to="/orderhistory">
                  Order History
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/change-password">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {/* Logout option */}
                <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
