/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navbar from "../Navbar";
import { Jwt_auth } from '../auth';
import { Card, Spinner } from 'react-bootstrap'
import { SearchBar } from '../books/search';

 
export const Dashboard = () => {
    const [token, userProfile, , axiosJWT] = Jwt_auth()
    const [ , name, email] = userProfile
    const [numBooks, setNumBooks] = useState("#")
    const [numUnread, setNumUnread] = useState("#")
    const [numFav, setNumFav] = useState("#")
    const [loading, setLoading] = useState(true);
    

 
    useEffect(() => {
        setTimeout(() => stats(), 1000); 
    }, [email]);
 
    let count = 0
    const stats = async () => {
        await axiosJWT.post('https://reyaly-books-backend.herokuapp.com/books', {
            user: email,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setNumBooks(response.data.length)
            count += 1
        })

        await axiosJWT.post('https://reyaly-books-backend.herokuapp.com/wish', {
            user: email,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setNumUnread(response.data.length)
            count += 1
        })

        await axiosJWT.post('https://reyaly-books-backend.herokuapp.com/fav', {
            user: email,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setNumFav(response.data.length)
            count += 1
        })
        console.log(count)
        if (count === 3) {
            setLoading(false)
        }
    }



    return (
        <div className="">
            <Navbar />
            
            <h1 className="header">Welcome Back {name}!</h1>
            <SearchBar />

            <div className="dash-container">
                <Link to={"/list"} >    
                    <div className="dash-buttons" id="nav-list">
                        <h3>Book List</h3>
                    </div>
                </Link>

                <Link to={"/favList"} >    
                    <div className="dash-buttons" id="nav-fav">
                        <h3>Favorites</h3>
                    </div>
                </Link>

                <Link to={"/wishList"} >    
                    <div className="dash-buttons" id="nav-wish">
                        <h3>Wish List</h3>
                    </div>
                </Link>

                <Link to={"/addBook"} >    
                    <div className="dash-buttons" id="nav-add">
                        <h3>Add Book</h3>
                    </div>
                </Link>
            </div>

            <Card>
                <div className="stats">
                    {loading ? 
                    <Spinner animation="border" variant="info" className="loading-spinner"/> 
                    :
                    <>
                    <div className="dash-card">
                        <h3># of Books</h3>
                        <h5>{numBooks}</h5>
                    </div>
                    <div className="dash-card">
                        <h3># Unread</h3>
                        <h5>{numUnread}</h5>
                    </div>
                    <div className="dash-card">
                        <h3># of Favorites</h3>
                        <h5>{numFav}</h5>
                    </div> 
                    </>
                    }
                </div>
            </Card>
        </div>
    )
}
