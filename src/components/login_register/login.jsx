import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "./log_reg_nav";
import { Form, Button, Card } from "react-bootstrap"

 
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
 
    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://reyaly-books-backend.herokuapp.com/login', {
                email: email,
                password: password
            });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
                console.log(error)
            }
        }
    }
 
    return (
        <div className="Login">
            <Navbar />
            <h1 className="header">Login</h1>
            <Card>
                <form onSubmit={Auth} className="box">
                    <p>{msg}</p>

                    <Form.Group className="log-form">
                        <Form.Label className="label">Email Address</Form.Label>
                        <Form.Control  
                            type="text" 
                            className="form-med" 
                            placeholder="Email Address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="log-form">
                        <Form.Label className="label">Password</Form.Label>
                        <Form.Control  
                            type="password" 
                            className="form-med" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </Form.Group>

                        <Button variant="blue" type="submit">Login</Button>
                        <p>Need to creat an account? <a href="/register">Register</a></p>
                </form>
            </Card>
        </div>
    )
}
