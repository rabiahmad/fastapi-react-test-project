import React, { useState, useEffect } from "react";
import axios from "axios";
import BookRating from "../book-rating/BookRating.jsx";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Pagination from "react-bootstrap/Pagination";
import "./BookList.css";

const BookList = () => {
  const [bookList, setBookList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const fetchSize = 3; // This is set based on the limitation of the REST API

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(`/api/book_ratings?page=${currentPage}&size=${fetchSize}`);
        setBookList(resp.data.items);
        // Get pages attribute from response and set the max page
        const pages = resp.data.pages;
        setMaxPage(pages);
      } catch {
        (error_message) => {
          console.log(error_message);
        };
      }
    }
    fetchData();
  }, [currentPage]);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    const new_page = Math.max(currentPage - 1, 1);
    setCurrentPage(new_page);
  };

  const handleNextPage = () => {
    const new_page = Math.min(currentPage + 1, maxPage);
    setCurrentPage(new_page);
  };

  const handleLastPage = () => {
    setCurrentPage(maxPage);
  };

  const handleGotoPage = (page_number) => {
    setCurrentPage(page_number);
  };

  function createPageList(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
      result.push(i);
    }
    return result;
  }

  return (
    <>
      <Container className="d-flex justify-content-center">
        <div>
          <Pagination>
            <Pagination.First onClick={handleFirstPage} />
            <Pagination.Prev onClick={handlePreviousPage} />

            {/* Dynamically create the page items based on number of pages*/}
            {createPageList(maxPage).map((page, index) =>
              page === currentPage ? (
                <Pagination.Item key={index} active>
                  {page}
                </Pagination.Item>
              ) : (
                <Pagination.Item key={index} onClick={() => handleGotoPage(page)}>
                  {page}
                </Pagination.Item>
              )
            )}

            <Pagination.Next onClick={handleNextPage} />
            <Pagination.Last onClick={handleLastPage} />
          </Pagination>
        </div>
      </Container>

      <Row>
        {bookList.map((book, index) => (
          <Col key={`${book.title}-${index}`} className="d-flex align-items-stretch">
            <BookRating title={book.title} author={book.author} rating={book.rating} review={book.review} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BookList;
