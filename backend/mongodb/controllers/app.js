import { Appointment } from '../models/appointment.js'; // Assuming Appointment is a Mongoose model
import jwt from 'jsonwebtoken';

export const appoint = (req, res, next) => {
    const userRegisteredCookie = req.cookies.userRegistered;
    const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);

    try {
        Appointment.aggregate([
            {
                $match: {
                    'id': decodedToken.id // Assuming 'id' is a field in the Appointment model
                }
            },
            {
                $lookup: {
                    from: 'Pet',
                    localField: 'petID',
                    foreignField: 'petID',
                    as: 'pets'
                }
            },
            {
                $lookup: {
                    from: 'Procedural',
                    localField: 'procID',
                    foreignField: 'procID',
                    as: 'procedures'
                }
            }
        ]).exec((err, result) => {
            if (err) {
                throw err;
            }
            res.allevent = result;
            console.log(result);
            return next();
        });
    } catch (error) {
        throw error;
    }
};