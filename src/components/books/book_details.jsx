import React from "react";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

export const Details = () => {
  let data = useLocation();
  const book = data.state.book;
  const navigate = useNavigate();

  const offToEdit = () => {
    navigate("/editBook", { state: { book: book } });
  };

  const formatDate = (str) => {
    const newDate = new Date(str);
    newDate.setUTCHours(4, 0, 0, 0);
    return newDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="book-details">
      <Navbar />
      <div className="header-container">
        <h1 className="header">{book.title}</h1>
      </div>

      <Card className="details-card">
        <h4 id="details-author">
          <strong>By:</strong> {book.author}
        </h4>
        <h5 id="details-genre">
          {!book.genre ? (
            <>
              <strong>Genre:</strong> None
            </>
          ) : (
            <>
              <strong>Genre: </strong> {book.genre}
            </>
          )}
        </h5>
        {book.notes ? (
          <div>
            <h3>
              <strong>Notes:</strong>
            </h3>
            <div className="notes-container">
              <p id="details-notes">{book.notes}</p>
            </div>
          </div>
        ) : null}
        <h5>
          {book.read
            ? `Finished reading on: ${formatDate(book.dateRead)}`
            : "Not Read"}
        </h5>
        <Form>
          <Button variant="blue" onClick={offToEdit}>
            Edit Book
          </Button>
        </Form>
      </Card>
    </div>
  );
};
