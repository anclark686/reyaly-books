import React from "react";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap"
  
export const Details = () => {

    let data = useLocation()
    const book = data.state.book 
    const navigate = useNavigate();

    const offToEdit = () => {
      navigate("/editBook", {state:{ book: book }})
    }

    const formatDate = (str) => {
      const newDate = new Date(str)
      newDate.setUTCHours(4,0,0,0)
      return (newDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }))
    }
    
    return (
      <div className="book-details">
        <Navbar />
        <h1 className="header">Book details</h1>
        <Card className="details-card">
          <h1 id="details-title"><strong>{book.title}</strong></h1>
          <h4 id="details-author"><strong>By: {book.author}</strong></h4>
          <h5 id="details-genre">{!book.genre ? "Genre: None" : 
          `Genre: ${book.genre}`}</h5>
          {book.notes ? <div>
          <h3><strong>Notes</strong></h3>
          <p id="details-notes">{book.notes}</p>
          </div> : null}
          <h5>{book.read ? `Finished reading on: ${formatDate(book.dateRead)}` :
              "Not Read"}</h5>
          <Form>
            <Button variant="blue" onClick={offToEdit}>
              Edit Book
            </Button>
          </Form>
        </Card>
      </div>
    );
  };
  