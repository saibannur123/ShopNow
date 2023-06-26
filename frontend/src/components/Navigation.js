import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Store } from "../Context/storeContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navigation() {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();

  const logOut = () => {
    dispatch({ type: "SIGN_OUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingInfo");
    localStorage.removeItem("token");
    navigate("/login-page");
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
                {/* {state.cart.cartItems.length > 0 ? (
                  <span className="cartNumber">
                    {state.cart.cartItems.length}
                  </span>
                ) : (
                  ""
                )} */}
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
            {!state.userInfo ? (
              <Nav.Link as={Link} to="/login-page">
                Sign in
              </Nav.Link>
            ) : (
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
