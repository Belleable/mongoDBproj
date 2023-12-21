import express from 'express';
export const router = express.Router();
import jwt from 'jsonwebtoken';
import { login } from '../mongodb/controllers/login.js'
import { petregister } from '../mongodb/controllers/petregister.js';
import { article } from '../mongodb/controllers/articles.js';
import { userEdit } from '../mongodb/controllers/userEdit.js';
import { allPet } from '../mongodb/controllers/home.js'
import { appoint } from '../mongodb/controllers/app.js';
import { petprofile } from '../mongodb/controllers/petprofile.js';
import { petVaccine } from '../mongodb/controllers/petvaccine.js';
import { userprofile } from '../mongodb/controllers/userprofile.js';
import { register } from '../mongodb/controllers/register.js';
import { logout } from '../mongodb/controllers/logout.js';
import { loggedIn } from '../mongodb/controllers/loggedin.js';
import { petEdit } from '../mongodb/controllers/petEdit.js';
import { petDelete } from '../mongodb/controllers/petDelete.js';

import multer from 'multer';


function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because January is 0
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}


router.get("/petprofile/:petid/delete", petDelete,(req, res) => {
    res.redirect('/home');
})

var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "client/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
});

const isImage = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
        console.log(cb)
    }
    cb(null, false);
};
/*
var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})*/
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

router.get('/', loggedIn);

router.post("/login", login);

router.post("/petregister", upload.single("petPfp"), petregister);

router.post('/userprofile/edit', userEdit);

router.get("/articles", article, (req, res, next) => {
    const data = res.all_article;
    console.log(data)
    return res.json(data);
})

router.get("/home", allPet, (req, res, next) => {
    const data = res.petData;
    return res.json(data);

});

/*router.get("/records", appoint, (req, res, next) => {

} )*/

router.get("/petprofile/:petid", petprofile, (req, res) => {
    let data = res.petinfo;
    return res.json(data);
})

router.get("/petprofile/:petid/petvaccine", petVaccine, (req, res, next) => {
    const data = res.core_vac;
    return res.json(data);
})

/*router.put("/appointment/:appid", appoint)*/

router.get("/userprofile", userprofile, (req, res) => {
    const data = res.userdata
    res.json(data);
})

router.post("/register", register)

router.put("/petprofile/:petid/edit", upload.single("petPfp"), petEdit)

router.get("/logout", logout);