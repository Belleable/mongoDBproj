import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import '../EditPet/EditPet.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';

const EditPet = () => {
    const {petid} = useParams();

    let [pet, setPet] = useState([]);
    const [edit, setEdit] = useState([]);

    const navigate = useNavigate()
    const location = useLocation()
    axios.defaults.withCredentials = true;
    /////////////////
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'petPfp') {
            const reader = new FileReader();
            const file = files[0];

            reader.onloadend = () => {
                setPet({
                    ...pet,
                    [name]: {
                        file,
                        dataUrl: reader.result,
                    },
                });
                setEdit({
                    ...edit,
                    [name]: {
                        file,
                        dataUrl: reader.result,
                    },
                });
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setPet({
                ...pet,
                [name]: value,
            });
            setEdit({
                ...edit,
                [name]: value,
            });
        }
    };

    useEffect(() => {
        // Fetch data from the first path
        const fetchPet = async () => {
            try {
                const response = await axios.get(`http://localhost:3009/petprofile/${petid}`);
                setPet(response.data);
            } catch (error) {
                console.error('Error fetching pet data:', error);
            }
        };

        fetchPet();
    }, []);


    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const resEdit = await axios.put(`http://localhost:3009/petprofile/${petid}/edit`, edit, {
                withCredentials: true,
            });
            if (resEdit.data.status === "success") {
                alert(resEdit.data.success);
                navigate(`/petprofile/${petid}`)
            } else {
                alert(resEdit.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='EditPet'>
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Add pet</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
                            </Helmet>
            <div class="back">
                <a href="#"><Link to={`/petprofile/${pet.petID}`}><i class="fa-solid fa-chevron-left fa-3x"></i></Link></a>
            </div>
            <main>
                <form action="" onSubmit={handleClick}>
                    <div class="container">
                        <div class="img-area" data-img="">
                            <i class='bx bxs-cloud-upload icon'></i>
                            <h3>Upload Image</h3>
                            <p>Image size must be less than <span>2MB</span></p>
                        </div>
                        <input type="file" id="file" name="petPfp" multiple={false} onChange={ handleChange }/>
                    </div>
                
                    <div class="textinfo">
                        <label for="name">Name</label>
                        <input id="name" type="text" placeholder="Name" name="petName" value={pet.petName} onChange={handleChange} />
                        <label for="type">Type</label>
                        <select id="type" name="petType" value={pet.petType} onChange={handleChange}>
                            <option value="Gender" disabled>Gender</option>
                            <option value="Cat">Cat</option>
                            <option value="Dog">Dog</option>
                        </select>
                        <p>Gender</p>
                        
                        {(() => {
                                if (pet.petGender === 'Female') {
                                    return (
                                        <div class="selectGender">
                                            <div>
                                                <input id="male" type="radio" value="Male" name="petGender" onChange={handleChange} />
                                                <label for="male">Male</label>
                                            </div>
                                            <div>
                                                <input id="female" type="radio" value="Female" name="petGender" onChange={handleChange} defaultChecked/>
                                                <label for="female">Female</label>
                                            </div>
                                        </div>
                                    );
                                } else if (pet.petGender === 'Male') {
                                    return (
                                        <div class="selectGender">
                                            <div>
                                                <input id="male" type="radio" value="Male" name="petGender" onChange={handleChange} defaultChecked/>
                                                <label for="male">Male</label>
                                            </div>
                                            <div>
                                                <input id="female" type="radio" value="Female" name="petGender" onChange={handleChange} />
                                                <label for="female">Female</label>
                                            </div>
                                        </div>
                                    );
                                }
                            })()}
    
                        <label for="DoB" name="petDoB" onChange={handleChange}>Birthday: {pet.petBDShow}</label>
                        <input id="DoB" type="date" name="petDoB" value={pet.petDoB} onChange={handleChange} />
                        <div class="CancelAndSubmit">
                            <Link to={`/petprofile/${petid}`}><button id="cancel" class="button">Cancel</button></Link>
                            <button id="submit" class="button" type="submit" name="submit" onClick={handleClick}>Submit</button>
                        </div>
                    </div>
                </form>
            </main>

            <nav class="navigate">
                <Link to="/articles"><a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
                <Link to="/home"><a href="#"><i class="fa-solid fa-house fa-2x"></i></a></Link>
                <Link to="/calendar"><a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
            </nav>
        </div>
    )
}

export default EditPet;