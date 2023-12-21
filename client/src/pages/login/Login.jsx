import React, { useEffect, useState } from 'react';
import './login.css';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        pw: '',
    });

    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3009/login', {
                username: formData.username,
                pw: formData.pw,
            });
            if (response.data.status === "success") {
                alert(response.data.success);
                navigate('/home');
            }
            else {
                console.log('Login failed. Error:', response.data.error);
                alert('Incorrect username or password. Please try again.');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Authentication failed. Please try again.');
        }
        setFormData({ username: '', pw: '' });
    };
    return (
        <div className="Login">
            <Helmet>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
                <title>Log In</title>
            </Helmet>
            <div className="body">
                <div class="box">
                    <form action="/login" method="post" onSubmit={handleSubmit}>
                        <i class="fa-solid fa-paw fa-6x"></i>
                        <div>
                            <div class="input-container">
                                <input 
                                type="text" 
                                required="" 
                                id="username" 
                                name="username" 
                                value={formData.username}
                                onChange={handleChange}
                                />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div class="input-container">
                                <input 
                                type="password" 
                                required="" 
                                id="pw" 
                                name="pw" 
                                value={formData.pw}
                                onChange={handleChange} />
                                <label htmlFor="pw">Password</label>
                            </div>
                            <input class="button" type="submit" value="Log in"/>
                            <Link to='/register'><a class="signup">Sign up</a></Link>
                        </div>
                    
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;