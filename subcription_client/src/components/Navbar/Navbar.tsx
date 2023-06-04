import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { Button, Container, Navbar } from "react-bootstrap";

type Props = {};

const NavigationBar = (props: Props) => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  console.log("user....", user);

  const handleLogout = () => {
    setUser({
      data: null,
      error: null,
      loading: false,
    });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Supreme article</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {user.data && (
              <Nav.Link onClick={handleLogout} href="/">
                logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
