import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const BookRating = ({ title, author, rating, review }) => {
  const [starRating, setStarRating] = useState("");

  useEffect(() => {
    const getStarRating = () => {
      let starRating = "";
      for (let i = 0; i < 5; i++) {
        if (i < rating) {
          starRating += "★";
        } else {
          starRating += "☆";
        }
      }
      setStarRating(starRating);
    };
    getStarRating();
  }, []);

  return starRating ? (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{starRating}</Card.Subtitle>
        <Card.Text>{review}</Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <></>
  );
};

export default BookRating;
