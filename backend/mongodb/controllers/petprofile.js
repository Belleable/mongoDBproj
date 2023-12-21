import { Pet } from '../models/pet.js';  // Assuming you have a Pet model
import mongoose from 'mongoose';

export const petprofile = async (req, res, next) => {
    const petId = req.params.petid;
    
    try {
        // Use findById to find the pet by ID
        const petInfo = await Pet.findById(new mongoose.Types.ObjectId(petId));

        if (!petInfo) {
            console.log("Can't find this pet");
            return res.status(404).send("Can't find this pet");
        } else {
            res.petinfo = {
                    _id: petInfo._id,
                    petName: petInfo.petName,
                    petType: petInfo.petType,
                    petDoB: new Date(petInfo.petDoB).toISOString().slice(0, 10),
                    petGender: petInfo.petGender,
                    years: calculateYears(petInfo.petDoB),
                    months: calculateMonths(petInfo.petDoB),
                    weeks: calculateWeeks(petInfo.petDoB),
                    days: calculateDays(petInfo.petDoB),
                    petPfp: petInfo.petPfp ? petInfo.petPfp.data.toString('base64') : null
                };

            return next();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};


// Helper functions to calculate age
function calculateYears(petDoB) {
    return Math.ceil((Date.now() - new Date(petDoB)) / (365.25 * 24 * 60 * 60 * 1000));
}

function calculateMonths(petDoB) {
    return Math.ceil((Date.now() - new Date(petDoB)) / (30.44 * 24 * 60 * 60 * 1000));
}

function calculateWeeks(petDoB) {
    return Math.ceil((Date.now() - new Date(petDoB)) / (7 * 24 * 60 * 60 * 1000));
}

function calculateDays(petDoB) {
    return Math.ceil((Date.now() - new Date(petDoB)) / (24 * 60 * 60 * 1000));
}