import React, { useState, useEffect } from "react";
import { Form, Col, Button, Card } from "react-bootstrap"
import Axios from "axios"
import Navbar from "../Navbar";
import { Jwt_auth } from '../auth';
import bookTypes from "./booktypes"
import { useNavigate } from "react-router-dom";


  
export const AddBook = () => {
  
    const [ , userProfile, refreshToken,  ] = Jwt_auth()
    const [ ,  , email] = userProfile
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [read, setRead] = useState(false)
    const [dateRead, setDateRead] = useState("")
    const [genre, setGenre] = useState("")
    const [notes, setNotes] = useState("")
    const [favorite, setFavorite] = useState(false)
    const navigate = useNavigate();
    
    useEffect(() => {
      refreshToken();
    }, []);

    const handleClick = async (e) => {
      e.preventDefault();
      console.log(`
        user: ${email},
        title: ${title},
        author: ${author},
        read: ${read},
        date read: ${dateRead},
        genre: ${genre},
        notes: ${notes},
        favorite: ${favorite}
      `)

      const book = {
        user: email,
            title: title,
            author: author,
            read: read,
            dateRead: dateRead,
            genre: genre,
            notes: notes,
            favorite: favorite,
      }

      try {
        await Axios.post(
          "https://reyaly-books-backend.herokuapp.com/addBook", book
        ).then((res) => {
          console.log(res.data)
          if (res.data === "Your book has been added!"){
            navigate("/details", {state:{ book: book }})
          }
          
        })
        
      } catch (err) {
        console.log(err)
      }
    }

    return (
      <div className="add-book">
        <Navbar />
        <h1 className="header">Add Book!</h1>
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
              <Form.Label>Read?</Form.Label>
              <Form.Check 
                type="switch"
                id="custom-switch"
                onChange={(e) => setRead(e.target.checked)}
              />
            </Form.Group>
            {read ? 
              <Form.Group as={Col} className="form-med">
                <Form.Label>Date Read</Form.Label>
                <Form.Control 
                  id="dateRead"
                  type="date" 
                  onChange={(e) => setDateRead(e.target.value)}
                /> 
              </Form.Group>
            : null}
            <Form.Group as={Col} className="form-large">
              <Form.Label>Notes</Form.Label>
              <Form.Control 
                id="bookNotes" 
                type="textarea" 
                style={{ height: '100px' }}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} className="form-med">
              <Form.Label>Favorite?</Form.Label>
              <Form.Check 
                type="switch"
                id="custom-switch"
                onChange={(e) => setFavorite(e.target.checked)}
              />
            </Form.Group>
            <Form>
            <Button 
              variant="blue" 
              type="submit" 
              onClick={handleClick}
            > Submit</Button>
          </Form>
        </Card>
      </div>
    );
  };
  