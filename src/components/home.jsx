import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Jwt_auth } from "./auth";
import Navbar from "./Navbar";
import { Card } from "react-bootstrap";

const Home = () => {
  const [token, , refreshToken] = Jwt_auth();

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="header-container">
        <h1 className="header">Reyaly Books</h1>
      </div>

      {!token ? (
        <div className="logged-out-home">
          <Link to={"/login"}>
            <div className="home-buttons" id="nav-login">
              <h3>Login</h3>
            </div>
          </Link>
          <Link to={"/register"}>
            <div className="home-buttons" id="nav-register">
              <h3>Register</h3>
            </div>
          </Link>
        </div>
      ) : (
        <div className="logged-in-home">
          <Card className="home-nav">
            <Link to={"/dashboard"}>
              <h5 className="nav-menu" id="nav-details">
                <strong>Dashboard</strong>
              </h5>
            </Link>
            <Link to={"/list"}>
              <h5 className="nav-menu" id="nav-list">
                <strong>Book List</strong>
              </h5>
            </Link>
            <Link to={"/favList"}>
              <h5 className="nav-menu" id="nav-fav">
                <strong>Favorites</strong>
              </h5>
            </Link>
            <Link to={"/addBook"}>
              <h5 className="nav-menu" id="nav-add">
                <strong>Add Book</strong>
              </h5>
            </Link>
            <Link to={"/wishList"}>
              <h5 className="nav-menu" id="nav-wish">
                <strong>Wish List</strong>
              </h5>
            </Link>
          </Card>
        </div>
      )}
      <Card>
        <div className="subheader-container">
          <h3 className="subheader">What is Reyaly Books?</h3>
        </div>
        <p>
          Reyaly Books is a place you can go to log and note all of your
          favorite, and not so favorite books. You have the functionality to
          track which books you have and havent read, and can keep meaningful
          notes for each book. For books that you haven't read, our handy
          Wish-List portion can keep track of this for you. You can also select
          the relevant genre to use in our search function. I hope that you have
          as much fun using Reyaly Books, as I had making it
        </p>
        <p>~ANC~</p>
      </Card>
    </div>
  );
};

export default Home;
