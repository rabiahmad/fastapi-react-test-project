import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <Form>
        <Form.Group as={Row} className="mb-4 input-field" controlId="formPlaintextEmail">
          {/* <Form.Label className="field-label" column sm="3">
            Email
          </Form.Label> */}
          <Col sm="15">
            <Form.Control size="lg" type="text" placeholder="Username" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4 input-field" controlId="formPlaintextPassword">
          {/* <Form.Label className="field-label" column sm="3">
            Password
          </Form.Label> */}
          <Col sm="15">
            <Form.Control size="lg" type="password" placeholder="Password" />
          </Col>
        </Form.Group>
      </Form>
      <button className="login-button">Login</button>
    </div>
  );
};

export default Login;
