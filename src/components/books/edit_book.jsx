import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Col, Button, Card } from "react-bootstrap";
import Axios from "axios";
import bookTypes from "./booktypes";

export const EditBook = () => {
  let data = useLocation();
  const book = data.state.book;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [read, setRead] = useState(false);
  const [dateRead, setDateRead] = useState(null);
  const [genre, setGenre] = useState("");
  const [notes, setNotes] = useState("");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    oldValues();
    // eslint-disable-next-line
  }, []);

  const oldValues = () => {
    let oldTitle = document.getElementById("bookTitle");
    let oldAuthor = document.getElementById("bookAuthor");
    let oldRead = document.getElementById("read-switch");
    let oldDateRead = document.getElementById("dateRead");
    let oldGenre = document.getElementById("bookGenre");
    let oldNotes = document.getElementById("bookNotes");
    let oldFavorite = document.getElementById("favorite-switch");

    oldTitle.value = book.title;
    oldAuthor.value = book.author;
    oldRead.checked = book.read;
    oldDateRead.value = book.dateRead;
    oldGenre.value = book.genre;
    oldNotes.value = book.notes;
    oldFavorite.checked = book.favorite;
  };

  const backToDetails = () => {
    navigate("/details", { state: { book: book } });
  };

  const deleteBook = async (req, res) => {
    navigate("/sure", { state: { book: book } });
  };

  const editBook = async () => {
    book.title = title ? title : book.title;
    book.author = author ? author : book.author;
    book.read = read ? read : book.read;
    book.dateRead = dateRead ? dateRead : book.dateRead;
    book.genre = genre ? genre : book.genre;
    book.notes = notes ? notes : book.notes;
    book.favorite = favorite ? favorite : book.favorite;
    
    try {
      await Axios.post("https://reyaly-books-backend.herokuapp.com/edit", {
        id: book.id,
        title: book.title,
        author: book.author,
        read: book.read,
        dateRead: book.dateRead,
        genre: book.genre,
        notes: book.notes,
        favorite: book.favorite,
      }).then((res) => {
        console.log(res.data);
        backToDetails();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit-book">
      <Navbar />
      <h1 className="header">Edit</h1>
      <Card className="add-card">
        <Form.Group as={Col} className="form-med">
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="bookTitle"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} className="form-med">
          <Form.Label>Author</Form.Label>
          <Form.Control
            id="bookAuthor"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} className="form-med">
          <Form.Label>Genre</Form.Label>
          <Form.Select
            name="bookGenre"
            id="bookGenre"
            onChange={(e) => setGenre(e.target.value)}
          >
            {bookTypes.map((genre) => (
              <option value={genre} key={genre}>
                {genre[0].toUpperCase() + genre.substring(1)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} className="form-med">
          <Form.Label>Read</Form.Label>
          <Form.Check
            type="switch"
            id="read-switch"
            onChange={(e) => setRead(e.target.checked)}
          />
        </Form.Group>
        {read || book.read ? (
          <Form.Group as={Col} className="form-med">
            <Form.Label>Date Read</Form.Label>
            <Form.Control
              id="dateRead"
              type="date"
              onChange={(e) => setDateRead(e.target.value)}
            />
          </Form.Group>
        ) : (
          <p id="dateRead"></p>
        )}
        <Form.Group as={Col} className="form-large">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            id="bookNotes"
            type="textarea"
            style={{ height: "100px" }}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} className="form-med">
          <Form.Label>Favorite?</Form.Label>
          <Form.Check
            type="switch"
            id="favorite-switch"
            onChange={(e) => setFavorite(e.target.checked)}
          />
        </Form.Group>

        <Form className="edit-buttons">
          <Button variant="blue" onClick={backToDetails}>
            Back
          </Button>
          <Button variant="blue" onClick={deleteBook}>
            Delete
          </Button>
          <Button variant="blue" onClick={editBook}>
            Submit
          </Button>
        </Form>
      </Card>
      <Footer />
    </div>
  );
};
