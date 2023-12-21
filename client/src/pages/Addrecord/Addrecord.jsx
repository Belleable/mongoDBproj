import React from 'react';
import { useState, useEffect } from 'react';
import './styleaddrecord.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

const Addrecord = () => {
    
    const navigate = useNavigate();
    const { petid } = useParams();

    const [record, setRecord] = useState({
        procName: "",
        procID: "",
        appID: "",
        procedureDate: ""
    });
    const [procChoice, setProcChoice] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await axios.get(`http://localhost:3009/petprofile/${petid}/addrecord`); // Replace with your API endpoint
                setProcChoice(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchPetData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        const selectedProcedure = procChoice.find(choice => choice.procName === value);
        if (selectedProcedure) {
            setRecord({
                ...record,
                [name]: value,
                procID: selectedProcedure.procID || "",
                appID: selectedProcedure.appID || "" 
            });
        } else {
            setRecord({
                ...record,
                [name]: value,
                
                 // Set default value for appID if selectedProcedure is not found
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            procName: record.procedure,
            procedureDate: record.procedureDate,
            procID: record.procID,
            appID: record.appID,
        };
        console.log(data)
        
        try{
            const respet = await axios.post(`http://localhost:3009/petprofile/${petid}/addrecord`, data, {
                withCredentials: true,
            })
            if(respet.data.status === "error") {
                alert(respet.data.error)
            } else {
                alert(respet.data.success)
                navigate(`/petprofile/${petid}/record`)
            }
        }
        catch(err){console.error(err)}
    }

    console.log(record);

    return (
        <div className='addpetrecord'>
        <Helmet>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Add Pet Record</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
            <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
        </Helmet>
        <div class="back">
                <a href="/home"><Link to='/home'><i class="fa-solid fa-chevron-left fa-3x"></i></Link></a>
        </div>
        
        <main>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                
                <div class="textinfo">
                    <h2>Procedure</h2>
                
                    <label htmlFor="procName">Procedure:</label>
                    <input type="text" id="procName" name="procName" value={record.procedure} onChange={handleChange} placeholder="Select or enter procedure" list="proceduresList"/>
                    <select id="procName" name="procName" value={record.procedure} onChange={handleChange}>
                        <option value="" disabled>Select or enter procedure</option>
                        {procChoice.map(choice => (
                            <option key={choice.procID} value={`${choice.procName}`}>{choice.procName} {choice.vacName}</option>
                        ))}
                    </select>

                    <label for="Date">Date:</label>
                        <input id="DoB" type="date" name="procedureDate" onChange={ handleChange }/>
                    <div class="CancelAndSubmit">
                        <button id="cancel" class="button">Cancel</button>
                        <button id="submit" className="button" type="submit" name="submit" variant="primary">Submit</button>
                    </div>
                </div>
            </form>
        </main>

        <nav class="navigate">
            <Link to="/articles"><a href="/articles"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
            <Link to="/home"><a href="/home"><i class="fa-solid fa-house fa-2x"></i></a></Link>
            <Link to="/calendar"><a href="/calendar"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
        </nav>
        </div>
    )
}

export default Addrecord;