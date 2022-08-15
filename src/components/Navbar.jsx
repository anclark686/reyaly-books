import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Jwt_auth } from './auth';
import { Container, Nav, Navbar } from 'react-bootstrap'
import Cookies from 'universal-cookie';
 
const Navigation = () => {
    const navigate = useNavigate();
    const [token, , refreshToken, ] = Jwt_auth()
    const cookies = new Cookies();


    useEffect(() => {
        refreshToken();
    }, [])

    const Logout = async () => {
        try {
            await axios.delete('https://reyaly-books-backend.herokuapp.com/logout', {
                refreshToken: cookies.get('refreshToken')
            });
            cookies.remove("refreshToken")
            if (window.location.href !== "https://reyaly-books.herokuapp.com/") {
                navigate("/");
            } else {
                window.location.reload()
            }
            
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <Navbar  className="navbar-main" expand="lg" >
            <Container>
                <Navbar.Brand className="navbar-brand" href="/">Reyaly Books</Navbar.Brand>
                {token ? 
                <>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto nav-container">
                            <div>
                                <Nav.Link 
                                    className="navbar-item" 
                                    href="/dashboard">Dashboard
                                </Nav.Link>
                                <Nav.Link 
                                    className="navbar-item"
                                    href="/list">Book List
                                </Nav.Link>
                                <Nav.Link 
                                    className="navbar-item"
                                    href="/favList">Favorites
                                </Nav.Link>
                                <Nav.Link 
                                    className="navbar-item"
                                    href="/wishlist">Wish List
                                </Nav.Link>
                                <Nav.Link 
                                    className="navbar-item"
                                    href="/addBook">Add Book
                                </Nav.Link>
                                <Nav.Link onClick={Logout} className="button is-light navbar-item">
                                    Log Out
                                </Nav.Link> 
                            </div>
                        </Nav>
                    </Navbar.Collapse> 
                </>: null}
            </Container>
        </Navbar>
    )
}
 
export default Navigation