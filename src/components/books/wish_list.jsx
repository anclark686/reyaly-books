import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Jwt_auth } from '../auth';
import Navbar from "../Navbar";
import { Card } from "react-bootstrap"
import { SearchBar } from './search';

  
export const WishList = () => {
    const [token, userProfile, refreshToken, axiosJWT] = Jwt_auth()
    const [ ,  , email] = userProfile
    const [books, setBooks] = useState([]);

 
    
const getBooks = async () => {
  // console.log(userProfile)
    const response = await axiosJWT.post('https://reyaly-books.herokuapp.com/wish', {
        user: email,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    setBooks(response.data);
}

    const formatDate = (str) => {
      const newDate = new Date(str)
      return (newDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }))
    }

    useEffect(() => { 
      refreshToken()
      setTimeout(() => getBooks(), 100);   
      console.log(books)  
    }, [email]);

  return (
    <div className="wish-list">
      <Navbar />
      
      <h1 className="header">Wish List!</h1>

      <SearchBar />
      
      <Card className="list-card">
        {books.length > 0 ? 
          <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Added On</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={book.id}>
                        <td><Link to="/details" state={{ book: book }}>
                            {book.title}
                        </Link></td>
                        <td>{book.author}</td>
                        <td>{formatDate(book.createdAt)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        : 
        <div className="null-message">
          <h1>You've read everything!</h1>
          <h1><a href="/addBook">Add Book</a></h1>
        </div> }
      </Card>
    </div>
    );
  };
  