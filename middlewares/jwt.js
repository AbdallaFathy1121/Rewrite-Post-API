require("dotenv").config();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        next();
    });
};


module.exports = {
    authenticateJWT: authenticateJWT
}