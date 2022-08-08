import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./log_reg_nav";
import { Form, Button, Card } from "react-bootstrap"

 
export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
 
    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://reyaly-books.herokuapp.com/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/login");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
 
    return (
        <div className="Register">
            <Navbar />
            <h1 className="header">Register</h1>
            <Card>
                <Form onSubmit={Register} className="box">
                    <p>{msg}</p>

                    <Form.Group className="reg-form">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-med" 
                            placeholder="Name"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="reg-form">
                        <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="form-med"
                                placeholder="Email Address" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                    </Form.Group>

                    <Form.Group className="reg-form">
                        <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                className="form-med" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                    </Form.Group>

                    <Form.Group className="reg-form">
                        <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                className="form-med"
                                placeholder="Confirm Password" 
                                value={confPassword} 
                                onChange={(e) => setConfPassword(e.target.value)} 
                            />
                    </Form.Group>

                    <Button variant="blue" type="submit">Register</Button>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </Form>
            </Card>
        </div>
    )
}
