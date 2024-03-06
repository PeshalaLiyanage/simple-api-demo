const jwt = require('jsonwebtoken');

// Generate access token
exports.generateAccessToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

// Generate refresh token
exports.generateRefreshToken = (data) => {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d' });
};

// Verify token
exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        console.log("Error verifying token")
        return null;
    }
};
