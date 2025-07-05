const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const createTokenAndSaveCookie = require('../jwt/generateToken');

exports.signUp = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Validate password and confirmPassword    
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Before creating newUser
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({
                message: 'User registered successfully', user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email
                }
            });
        }
    } catch (error) {
        console.error('Error during sign up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//login

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create JWT token and set cookie
        createTokenAndSaveCookie(user._id, res);

        res.status(200).json({
            message: 'Login successful', user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//logout
exports.logout = (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie('jwt');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//get all users
exports.allUsers = async (req, res) => {
    try {

        const loggedInUserId = req.user._id; // Assuming user ID is stored in req.user after authentication for that we have creadted a middleware.
        const filteredUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select('-password -__v'); // Exclude password and __v field
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
