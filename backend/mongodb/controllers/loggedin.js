import jwt from 'jsonwebtoken';
//Check the login
//Have next because this is gonna be middleแว of a page
export const loggedIn = (req, res, next) => {
    if (!req.user) {
        try {
            const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        } catch (err) {
            return next();
        }
    }
}
