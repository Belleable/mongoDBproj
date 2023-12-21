import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
    try {
        const { username, pw } = req.body;
        console.log("From login " + username + " " + pw);

        if (!username || !pw) {
            return res.status(400).json({
                status: "error",
                error: "Please enter your username and password",
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                status: "error",
                error: "Account not found or incorrect password",
            });
        }

        const storedHashedPassword = user.pw;

        const isMatch = await bcrypt.compare(pw, storedHashedPassword);

        if (isMatch) {
            const id = user._id;
            const token = jwt.sign(
                { id: id },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES || "30m",
                }
            );
            const cookieOptions = {
                expires: new Date(
                    Date.now() + (parseInt(process.env.COOKIE_EXPIRES) || 1) * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
                path: '/',
            };

            res.cookie("userRegistered", token, cookieOptions);
            return res.status(200).json({
                status: "success",
                success: "User logged in",
                token,
                cookieOptions,
            });
        } else {
            return res.status(401).json({
                status: "error",
                error: "Account not found or incorrect password",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", error: "Something went wrong" });
    }
};