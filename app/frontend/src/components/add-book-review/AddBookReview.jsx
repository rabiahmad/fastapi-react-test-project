import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./AddBookReview.css";

const AddBookReview = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    author: "",
    rating: "",
    review: "",
  });

  function handleTextInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("handled text input change");
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      // Add post request here to add book review to the backend database
      axios.post("/api/book_ratings/", formData);

      // Set form control values back to empty strings
      setFormData({
        title: "",
        author: "",
        rating: "",
        review: "",
      });
    } catch {
      (error) => console.log(error);
    }
  }

  return (
    <>
      <div className="form-container">
        <h2>Add a new book review</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="book-review-form">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type="text" name="title" value={formData.title} onChange={handleTextInputChange} />
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" value={formData.author} onChange={handleTextInputChange} />
            <Form.Label>Rating</Form.Label>
            <Form.Control type="text" name="rating" value={formData.rating} onChange={handleTextInputChange} />
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="review"
              value={formData.review}
              onChange={handleTextInputChange}
            />
          </Form.Group>
          <Button
            type="submit"
            disabled={!formData.title || !formData.author || !formData.rating || !formData.review}
            variant="primary"
          >
            Submit review
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddBookReview;
