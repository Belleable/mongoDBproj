import { Pet } from '../models/pet.js';  // Assuming you have a Pet model
import jwt from 'jsonwebtoken';

export const allPet = async (req, res, next) => {
    const userRegisteredCookie = req.cookies.userRegistered;
    const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);

    try {
        const petData = await Pet.find({ id: decodedToken.id })
            .select('petPfp petName petType petDoB petGender') // Include only relevant fields
            .lean(); // Convert Mongoose documents to plain JavaScript objects
        console.log(petData[0])
        if (petData.length === 0) {
            console.log("Can't find this user");
            return res.status(404).send("Can't find this user");
        } else {
            const profile_image = petData.profile_image ? petData.petPfp.data.toString('base64') : null;
            res.petData = petData.map((pet) => (
                {
                    ...pet,
                    years: calculateYears(pet.petDoB),
                    months: calculateMonths(pet.petDoB),
                    weeks: calculateWeeks(pet.petDoB),
                    days: calculateDays(pet.petDoB),
                    petPfp: encodePetPfp(pet.petPfp),
                    petPfpUrl: profile_image
                }));

            return next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

// Helper functions to calculate age
function calculateYears(petDoB) {
    return Math.floor((Date.now() - new Date(petDoB)) / (365.25 * 24 * 60 * 60 * 1000));
}

function calculateMonths(petDoB) {
    return Math.floor((Date.now() - new Date(petDoB)) / (30.44 * 24 * 60 * 60 * 1000));
}

function calculateWeeks(petDoB) {
    return Math.floor((Date.now() - new Date(petDoB)) / (7 * 24 * 60 * 60 * 1000));
}

function calculateDays(petDoB) {
    return Math.floor((Date.now() - new Date(petDoB)) / (24 * 60 * 60 * 1000));
}

// Helper function to encode petPfp as base64
function encodePetPfp(petPfp) {
    if (petPfp && petPfp instanceof Buffer) {
        return `data:image/jpeg;base64,${petPfp.toString('base64')}`;
    }
    return null; // Or a default image URL
}