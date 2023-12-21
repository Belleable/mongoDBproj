import { Pet } from '../models/pet.js';
import { Procedural } from '../models/procedural.js';
import { Appointment } from '../models/appointment.js';
import jwt from 'jsonwebtoken'
const saltRounds = 10;

export const petregister = async (req, res) => {
    const userRegisteredCookie = req.cookies.userRegistered;
    const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);

    const { petName, petType, petDoB, petGender, petPfp } = req.body;

    try {
        if (!petName || !petType || !petDoB || !petPfp || !petGender) { // ทำดีฟ้อลรูปหมาละไม่ต้องให้กรอกก็ได้ดีมั้ย
            return res.json({
                status: "error",
                error: "Please enter all your pet information"
            });
        } else {

            const existingPet = await Pet.findOne({ id: decodedToken.id, petName });
            const binaryData = Buffer.from(petPfp.dataUrl.split(',')[1], 'base64'); //how

            if (existingPet) {
                return res.json({ status: "error", error: `${petName} has already been registered.` });
            }

            const newPet = new Pet({
                petName,
                petType,
                petDoB,
                binaryData,
                petGender,
                id: decodedToken.id,
            });

            await newPet.save();

            res.json({ status: "success", success: "Your pet is ready!" });

            const petResult = await Pet.findOne({ id: decodedToken.id, petName });

            const procResult = await Procedural.find({ petType, procName: 'core vaccination' });

            if (procResult && procResult.length > 0) {
                for (let i = 0; i < procResult.length; i++) {
                    const newAppointment = new Appointment({
                        petID: petResult._id,
                        procID: procResult[i]._id,
                        status: 'info',
                    });
                    await newAppointment.save();
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};