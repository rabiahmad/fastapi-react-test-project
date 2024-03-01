import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/react.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "../sidebar/Sidebar.jsx";
import "./AppNavbar.css";

const AppNavbar = () => {
  const [show, setShow] = React.useState(false);

  const handleToggleSidebar = () => {
    setShow(!show); // Toggle the state of the sidebar
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <div className="burger-container">
          <RxHamburgerMenu size={30} color="white" onClick={setShow} />
        </div>
        <Container>
          <div className="nav-logo-container">
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />
          </div>
          <Navbar.Brand href="/">React App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Quote</Nav.Link>
            <Nav.Link href="/accordian">Features</Nav.Link>
            <Nav.Link href="/api-docs">API Docs</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Sidebar show={show} onHide={handleToggleSidebar} />
    </>
  );
};

export default AppNavbar;
