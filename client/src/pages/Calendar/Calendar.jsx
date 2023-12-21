import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Calendar.css'

const Calendar = () => {
    const [showapp, setShowapp] = useState([])
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:3009/calendar`); // Replace with your API endpoint
                setShowapp(response.data);
            } catch (error) {
                console.error('Error fetching appointment list:', error);
            }
        };

        fetchAppointments();
    }, []);

    
    return (
        <div className="Today">
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Appointment</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            <header>
                <h1>Appointment List</h1>
            </header>

            <main>
                {showapp.map(app => (
                    <div className='container'>
                        <div className="appointment" key={app.appID}>
                            {app.userID && <h2>{app.procName}</h2>}
                            <span>for {app.petName}</span>
                        </div>
                    </div>
                ))}
            </main>
            <nav class="navigate">
                <Link to="/articles"><a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
                <Link to="/home"><a href="#"><i class="fa-solid fa-house fa-2x"></i></a></Link>
                <Link to="/calendar"><a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
            </nav>
        </div>
    )
}

export default Calendar;