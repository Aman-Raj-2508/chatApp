const jwt = require('jsonwebtoken');

const createTokenAndSaveCookie = (userId, res) => {
    // Create a JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '10d' });

    // Set the token in a cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, // Use secure cookies in production
        maxAge: 3600000, // 1 hour in milliseconds

        sameSite: "strict",
    });

    return token;
}

module.exports = createTokenAndSaveCookie;