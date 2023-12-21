import { Pet } from '../models/pet.js';  // Assuming you have a Pet model

export const petEdit = async (req, res, next) => {
    for (let key in req.body) {
        if (key === 'petPfp') {
            const binaryData = Buffer.from(req.body[key].dataUrl.split(',')[1], 'base64');
            const picData = {
                data: binaryData,
                contentType: String
            }

            req.body[key] = picData;
        }
    }

    try {
        const petId = req.params.petid;

        // Use findOneAndUpdate to find and update the document
        const updatedPet = await Pet.findOneAndUpdate(
            { _id: petId },
            {
                $set: req.body,
            },
            { new: true } // To return the updated document
        );  

        if (updatedPet) {
            console.log("Edit pet information success");
            res.json({ status: "success", success: "Edit Success", updatedPet });
        } else {
            console.log(`Pet with ID ${petId} not found`);
            res.status(404).json({ error: "Pet not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};