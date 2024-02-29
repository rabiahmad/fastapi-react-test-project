import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import logo from "../../assets/react.svg";
import "./CollapsibleForm.css";

const CollapsibleForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`collapsible-form ${isOpen ? "open" : ""}`}>
      <img
        src={logo}
        width="50"
        height="50"
        className={`d-inline-block align-top collapsible-form-header ${isOpen ? "expanded" : "collapsed"}`}
        alt="React Bootstrap logo"
        onClick={toggleCollapse}
      />

      <div className="collapsible-form-content">
        {isOpen && (
          <form>
            {
              <Form>
                <Form.Group className="mb-3" controlId="book-review-form">
                  <Form.Label>Sensor ID</Form.Label>
                  <Form.Control type="text" name="title" />
                  <Form.Label>xxxxx</Form.Label>
                  <Form.Control type="text" name="author" />
                  <Form.Label>xxxxxx</Form.Label>
                  <Form.Control type="text" name="rating" />
                  <Form.Label>xxxxxx</Form.Label>
                  <Form.Control type="text" name="review" />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() => {
                    toggleCollapse();
                  }}
                >
                  Preview
                </Button>
              </Form>
            }
          </form>
        )}
      </div>
    </div>
  );
};

export default CollapsibleForm;
