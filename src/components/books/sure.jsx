import React from "react";
import Axios from "axios";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

export const YouSure = () => {
  let data = useLocation();
  const book = data.state.book;
  const navigate = useNavigate();

  const deleteBook = async (req, res) => {
    try {
      await Axios.delete("https://reyaly-books-backend.herokuapp.com/delete", {
        data: { id: book.id },
      }).then((res) => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const backToDetails = () => {
    navigate("/details", { state: { book: book } });
  };

  return (
    <div>
      <Navbar />
      <Card className="card">
        <h1>Are you sure you want to delete?</h1>
        <Form className="edit-buttons">
          <Button variant="blue" onClick={backToDetails}>
            No! Go Back
          </Button>
          <Button variant="blue" onClick={deleteBook}>
            Yes! Delete
          </Button>
        </Form>
      </Card>
    </div>
  );
};
