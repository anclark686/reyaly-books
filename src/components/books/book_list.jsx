import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Jwt_auth } from "../auth";
import Navbar from "../Navbar";
import { Card, Spinner } from "react-bootstrap";
import { SearchBar } from "./search";

export const List = () => {
  const [token, userProfile, refreshToken, axiosJWT] = Jwt_auth();
  const [, , email] = userProfile;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    await axiosJWT
      .post("https://reyaly-books-backend.herokuapp.com/books", {
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
  const sortBooks = (column, direction) => {
    let trueList = [];
    let falseList = [];
    if (column !== "read") {
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
      books.forEach((book) => {
        if (book.read === true) {
          trueList.push(book);
        } else {
          falseList.push(book);
        }
      });
      if (direction === "up") {
        setBooks(trueList.concat(falseList));
      } else {
        setBooks(falseList.concat(trueList));
      }
    }
  };

  useEffect(() => {
    refreshToken();
    setTimeout(() => getBooks(), 100);
    // eslint-disable-next-line
  }, [email]);

  return (
    <div className="list">
      <Navbar />
      <div className="header-container">
        <h1 className="header">Book List</h1>
      </div>

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
              <table className="is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th scope="col">
                      <div className="table-header">
                        <span className="th-label">Title</span>
                        <span className="sort-buttons">
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
                        </span>
                      </div>
                    </th>
                    <th scope="col">
                      <div className="table-header">
                        <span className="th-label">Author</span>
                        <span className="sort-buttons">
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
                        </span>
                      </div>
                    </th>
                    <th scope="col">
                      <div className="table-header">
                        <span className="th-label">Genre</span>
                        <span className="sort-buttons">
                          <button
                            className="sort-button"
                            onClick={() => sortBooks("genre", "up")}
                          >
                            &#9650;
                          </button>
                          <button
                            className="sort-button"
                            onClick={() => sortBooks("genre", "down")}
                          >
                            &#9660;
                          </button>
                        </span>
                      </div>
                    </th>
                    <th scope="col">
                      <div className="table-header">
                        <span className="th-label">Read</span>
                        <span className="sort-buttons">
                          <button
                            className="sort-button"
                            onClick={() => sortBooks("read", "up")}
                          >
                            &#9650;
                          </button>
                          <button
                            className="sort-button"
                            onClick={() => sortBooks("read", "down")}
                          >
                            &#9660;
                          </button>
                        </span>
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
                      <td>{book.genre}</td>
                      <td>
                        {book.read ? (
                          <span aria-label="check" role="img">
                            ✅
                          </span>
                        ) : (
                          <span aria-label="x" role="img">
                            ❌
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="null-message">
                <h1>You haven't logged any books!</h1>
                <h1>
                  <a href="/addBook">Get Started</a>
                </h1>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
