import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CapitaliseForm = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  function handleTextInputChange(e) {
    setInput(e.target.value);
    console.log("handleTextInputChange has set input to", e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(input);
      const { data } = await axios.post(
        "/api/capitalise",
        { input_str: input },
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(data);
      setInput("");
      await console.log("result is", result);
    } catch {
      (error_message) => {
        console.log("Axios error", error_message);
      };
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example User input - fetch result from Python backend</Form.Label>
          <Form.Control type="text" value={input} rows={3} onChange={handleTextInputChange} />
        </Form.Group>
        <Button type="submit" disabled={input.length === 0} variant="primary">
          Click me
        </Button>
      </Form>

      <h3>{result}</h3>
    </>
  );
};

export default CapitaliseForm;
