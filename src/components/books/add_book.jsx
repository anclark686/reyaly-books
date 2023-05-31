import React, { useState, useEffect } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import Axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Jwt_auth } from "../auth";
import bookTypes from "./booktypes";
import { useNavigate } from "react-router-dom";

export const AddBook = () => {
  const [, userProfile, refreshToken] = Jwt_auth();
  const [, , email] = userProfile;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [read, setRead] = useState(false);
  const [dateRead, setDateRead] = useState("");
  const [genre, setGenre] = useState("");
  const [notes, setNotes] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line
  }, []);

  // const fieldValidation = () => {
  //   if (title.trim() === "" || title.trim().length <= 1) {
  //     if (!invalidArray.includes("title")) {
  //       invalidArray.push("title");
  //     }
  //   }
  //   if (author.trim() === "" || author.trim().length <= 1) {
  //     if (!invalidArray.includes("author")) {
  //       invalidArray.push("author");
  //     }
  //   }
  //   if (genre === "---Select One---" || genre === "") {
  //     if (!invalidArray.includes("genre")) {
  //       invalidArray.push("genre");
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const book = {
      user: email,
      title: title,
      author: author,
      read: read,
      dateRead: dateRead,
      genre: genre,
      notes: notes,
      favorite: favorite,
    };

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      try {
        await Axios.post(
          "https://reyaly-books-backend.herokuapp.com/addBook",
          book
        ).then((res) => {
          if (res.data === "Your book has been added!") {
            navigate("/details", { state: { book: book } });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    setValidated(true);
  };

  return (
    <div className="add-book">
      <Navbar />
      <h1 className="header">Add Book!</h1>
      <Card className="add-card">
        <Form
          noValidate
          validated={validated}
          className="add-form"
          onSubmit={handleSubmit}
        >
          <Form.Group as={Col} className="add-contents">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              id="bookTitle"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="add-contents">
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              id="bookAuthor"
              onChange={(e) => setAuthor(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="add-contents">
            <Form.Label>Genre</Form.Label>
            <Form.Select
              required
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
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="add-contents">
            <Form.Label>Read?</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => setRead(e.target.checked)}
            />
          </Form.Group>
          {read ? (
            <Form.Group as={Col} className="add-contents">
              <Form.Label>Date Read</Form.Label>
              <Form.Control
                id="dateRead"
                type="date"
                onChange={(e) => setDateRead(e.target.value)}
              />
            </Form.Group>
          ) : null}
          <Form.Group as={Col} className="add-notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              id="bookNotes"
              type="textarea"
              style={{ height: "100px" }}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} className="add-contents">
            <Form.Label>Favorite?</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => setFavorite(e.target.checked)}
            />
          </Form.Group>

          <Button variant="blue" type="submit">
            {" "}
            Submit
          </Button>
        </Form>
      </Card>
      <Footer />
    </div>
  );
};
