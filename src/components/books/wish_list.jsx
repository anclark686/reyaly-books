import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Jwt_auth } from "../auth";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Card, Spinner } from "react-bootstrap";
import { SearchBar } from "./search";

export const WishList = () => {
  const [token, userProfile, refreshToken, axiosJWT] = Jwt_auth();
  const [, , email] = userProfile;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    await axiosJWT
      .post("https://reyaly-books-backend.herokuapp.com/wish", {
        user: email,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      });
  };

  const formatDate = (str) => {
    const newDate = new Date(str);
    return newDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const sortBooks = (column, direction) => {
    if (column !== "createdAt") {
      if (direction === "up") {
        setBooks(
          [...books].sort((a, b) => {
            return a[column].localeCompare(b[column]);
          })
        );
      } else {
        setBooks(
          [...books]
            .sort((a, b) => {
              return a[column].localeCompare(b[column]);
            })
            .reverse()
        );
      }
    } else {
      if (direction === "up") {
        setBooks(
          [...books].sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
        );
      } else {
        setBooks(
          [...books]
            .sort((a, b) => {
              return new Date(a.createdAt) - new Date(b.createdAt);
            })
            .reverse()
        );
      }
    }
  };

  useEffect(() => {
    refreshToken();
    setTimeout(() => getBooks(), 100);
    // eslint-disable-next-line
  }, [email]);

  return (
    <div className="wish-list">
      <Navbar />

      <h1 className="header">Wish List!</h1>

      <SearchBar />

      <Card className="list-card">
        {loading ? (
          <Spinner
            animation="border"
            variant="info"
            className="loading-spinner"
          />
        ) : (
          <>
            {books.length > 0 ? (
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>
                      <p>Title</p>
                      <div className="sort-buttons">
                        <button
                          className="sort-button"
                          onClick={() => sortBooks("title", "up")}
                        >
                          &#9650;
                        </button>
                        <button
                          className="sort-button"
                          onClick={() => sortBooks("title", "down")}
                        >
                          &#9660;
                        </button>
                      </div>
                    </th>
                    <th>
                      <p>Author</p>
                      <div className="sort-buttons">
                        <button
                          className="sort-button"
                          onClick={() => sortBooks("author", "up")}
                        >
                          &#9650;
                        </button>
                        <button
                          className="sort-button"
                          onClick={() => sortBooks("author", "down")}
                        >
                          &#9660;
                        </button>
                      </div>
                    </th>
                    <th>
                      <p>Added On</p>
                      <div className="sort-buttons">
                        <button
                          className="sort-button"
                          onClick={() => sortBooks("createdAt", "up")}
                        >
                          &#9650;
                        </button>
                        <button
                          className="sort-button"
                          onClick={() => sortBooks("createdAt", "down")}
                        >
                          &#9660;
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr key={book.id}>
                      <td>
                        <Link to="/details" state={{ book: book }}>
                          {book.title}
                        </Link>
                      </td>
                      <td>{book.author}</td>
                      <td>{formatDate(book.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="null-message">
                <h1>You've read everything!</h1>
                <h1>
                  <a href="/addBook">Add Book</a>
                </h1>
              </div>
            )}
          </>
        )}
      </Card>
      <Footer />
    </div>
  );
};
