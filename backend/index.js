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
import {dbmong} from './routes/db-mongo.js'

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

dbmong.collection((err) => {
      if (err) throw err;
  console.log("db connected");
});


app.use("/", router);
//app.use("/api", auth);

app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
});
