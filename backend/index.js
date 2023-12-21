import express from "express";
import path from 'path';
import cors from "cors";
const app = express();
const port = process.env.PORT || 3009;
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { router } from './routes/pagesmongo.js';
import {router as auth} from './mongodb/controllers/auth.js'
import fileUpload from 'express-fileupload';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nwibvqh.mongodb.net/vaccine`

mongoose.connect(dbURI, {});

const connection = mongoose.connection;

connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

connection.once("open", () => {
    console.log("MongoDB database connected.");
});

import { Appointment } from "./mongodb/models/appointment.js";
import { Article } from "./mongodb/models/article.js";
import { petArticle } from "./mongodb/models/pet_article.js"
import { Pet } from "./mongodb/models/pet.js";
import { Procedural } from "./mongodb/models/procedural.js";
import { User } from "./mongodb/models/user.js";
import { Vaccine } from "./mongodb/models/vaccine.js";

const appointment = Appointment;
const aeticle = Article;
const petarticle = petArticle;
const pet = Pet;
const procedural = Procedural;
const user = User;
const vaccine = Vaccine;


app.use("/uploads", express.static('../uploads'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '25mb' })); //Can read the json file that get from user register.html


app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
}));


app.use(fileUpload())


app.use("/", router);
//app.use("/api", auth);

app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
});
