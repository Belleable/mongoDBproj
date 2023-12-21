import { Pet } from '../models/pet.js'; // Import your Pet Mongoose model
import { Appointment } from '../models/appointment.js'; // Import your Appointment Mongoose model
import jwt from 'jsonwebtoken';

export const calendar = (req, res, next) => {
    const userRegisteredCookie = req.cookies.userRegistered;
    const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);

    Pet.find({}) // Assuming you want all Pets related to the user's Appointments
        .populate({
            path: 'appointments',
            match: { id: decodedToken.id } // Assuming 'id' corresponds to the user's id in Pet or Appointment schema
        })
        .exec((err, pets) => {
            if (err) {
                throw err;
            }
            res.all_event = pets;
            console.log(res.all_event);
            return next();
        });
};