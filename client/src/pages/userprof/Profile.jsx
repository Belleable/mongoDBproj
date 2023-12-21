import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3009/userprofile");
                setProfile(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserProfile();
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const logout = await axios.get('http://localhost:3009/logout');
            if (logout.data.status === "success") {
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
        }
        
    }

    const handleEdit = async () => {
        navigate('/userprofile/edit')
    }


    return (
        <div className="UserProfile">
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Profile</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet" />
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            <body>
                <div className="profile-container" key={profile._id}>
                    <div class="mid-container">
                        <div class="profile-picture-container">
                            <h2>User Profile</h2>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <th>Username:</th>
                            <td id="username" name="username">{profile.username}</td>
                        </tr>
                        <tr>
                            <th>First Name:</th>
                            <td id="fname" name="fname">{profile.fname}</td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td id="lname" name="lname">{profile.lname}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td id="email" name="email">{profile.email}</td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td id="phone" name="phone">{profile.phone}</td>
                        </tr>
                    </table>
                    <button id="logout" role="button" onClick={handleLogout}>Log out</button>
                    <button id="logout" role="button" onClick={handleEdit}>Edit</button>
                </div>
                    
                

                <nav class="navigate">
                    <Link to="/articles"><a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
                    <Link to="/home"><a href="#"><i class="fa-solid fa-house fa-2x"></i></a></Link>
                    <Link to="/calendar"><a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
                </nav>
            </body>
        </div>
    )
}

export default Profile;
