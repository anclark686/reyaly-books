import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Jwt_auth = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

    const refreshToken = async () => {
        try {
            const response = await axios.get('https://reyaly-books.herokuapp.com/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setId(decoded.userId);
            setName(decoded.name);
            setEmail(decoded.email);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response.status !== 401) {
                console.log(error)
            } else {
                navigate("/")
            }
            // else if (pageName !== "login" || pageName !== "register") {
            //     navigate("/")
            // }
        }
    }
 
    const axiosJWT = axios.create();
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('https://reyaly-books.herokuapp.com/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setId(decoded.userId);
            setName(decoded.name);
            setEmail(decoded.email);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        
        return Promise.reject(error);
    });

    const user = [id, name, email]


    return [token, user, refreshToken, axiosJWT]
}