import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Sidebar.css";

function Sidebar({ show, onHide }) {
  return (
    <>
      <Offcanvas show={show} onHide={onHide}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Components</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="description">
            This is some description about the components. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
          </div>
          <a href="/" className="link-item">
            <div className="link-text">Plotly charts</div>
          </a>
          <a href="/" className="link-item">
            <div className="link-text">Counter component</div>
          </a>
          <a href="/book-list" className="link-item">
            <div className="link-text">Book Ratings</div>
          </a>
          <a href="/add-book-review" className="link-item">
            <div className="link-text">Add book review</div>
          </a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
