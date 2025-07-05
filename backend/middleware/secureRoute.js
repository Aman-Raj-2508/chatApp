const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // Attach user information to the request object
        // This allows us to access user data in subsequent middleware or route handlers
        const user = await userModel.findById(decoded.userId).select('-password -__v'); // Currently logged in user
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach user information to the request object
        next();
    } catch (error) {
        console.error('Error in secureRoute middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = secureRoute;
// This middleware checks for a valid JWT token in the request cookies.