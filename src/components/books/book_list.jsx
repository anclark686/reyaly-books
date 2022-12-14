import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Jwt_auth } from '../auth';
import Navbar from "../Navbar";
import { Card } from "react-bootstrap"
import { SearchBar } from './search';

  
export const List = () => {
    const [token, userProfile, refreshToken, axiosJWT] = Jwt_auth()
    const [ ,  , email] = userProfile
    const [books, setBooks] = useState([]);

 
    
const getBooks = async () => {
  // console.log(userProfile)
    const response = await axiosJWT.post('https://reyaly-books-backend.herokuapp.com/books', {
        user: email,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    setBooks(response.data);
}


    useEffect(() => { 
      refreshToken()
      setTimeout(() => getBooks(), 100);     
      console.log(books)
    }, [email]);

  return (
    <div className="list">
      <Navbar />
      
      <h1 className="header">Book List!</h1>
      
      <SearchBar />

      <Card className="list-card">
        {books.length > 0 ? 
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Read</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={book.id}>
                        <td><Link to="/details" state={{ book: book }}>
                            {book.title}
                        </Link></td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{book.read ? 
                        <span aria-label="check" role="img">✅</span> 
                        : <span aria-label="x" role="img">❌</span> 
                        }</td>
                    </tr>
                ))}
            </tbody>
        </table> 
        : 
        <div className="null-message">
          <h1>You haven't logged any books!</h1>
          <h1><a href="/addBook">Get Started</a></h1>
        </div>}
      </Card>
    </div>
    );
  };
  