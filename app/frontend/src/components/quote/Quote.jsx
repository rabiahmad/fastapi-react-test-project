import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Quote.css";

const Quote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const getQuote = async () => {
      await axios
        .get("/api/quote")
        .then((res) => {
          console.log("Quote retrieved!");
          console.log("response data", res.data);
          setQuote(res.data);
        })
        .catch((err) => console.log("error in getQuote", err));
    };

    return () => {
      getQuote();
    };
  }, []);

  return (
    <>
      {quote ? (
        <div>
          <h1>
            <div className="quote">{quote.quote}</div>
          </h1>
          <div className="author">&mdash; {quote.author}</div>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Quote;
