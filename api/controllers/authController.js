
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Sequelize User model
const Token = require('../models/token'); // Sequelize User model
const {generateAccessToken, generateRefreshToken, verifyToken} = require('../utils/token');

// Login function
exports.login = async (req, res) => {
    // Authenticate user (e.g., verify username and password)
    const {userName, password} = req.body;

    // Find user by username
    const user = await User.findOne({where: {userName}});

    // If user not found, return error
    if (!user) {
        return res.status(401).json({error: 'Invalid username or password'});
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!passwordMatch) {
        return res.status(401).json({error: 'Invalid username or password'});
    }

    const userData = {
        userId: user.id,
        userName: user.userName
    }
    // If authentication succeeds, generate access token and refresh token
    const accessToken = generateAccessToken({userData});
    const refreshToken = generateRefreshToken({userData});

    // Store refresh token in database (associate it with user)
    let userToken = await Token.findOne({where: {id: user.id}});
    if (userToken) {
        userToken.token = refreshToken
        userToken.save();
    } else {
        await Token.create({
            userId: user.id,
            token: refreshToken,
        });
    }
    // Respond with tokens
    res.json({accessToken, refreshToken});
};

// Refresh token function
exports.refreshToken = async (req, res) => {
    const {refreshToken} = req.body;
    // Verify refresh token
    const decoded = verifyToken(refreshToken);
    if (!decoded) {
        return res.status(401).json({error: 'Invalid or expired refresh token'});
    }
    // Fetch user data from database using decoded token (e.g., user ID)
    const user = await User.findOne({where: {id: decoded.userId}})
    // Generate new access token
    const accessToken = generateAccessToken({userId: user.id, userName: user.userName});
    // Respond with new access token
    res.json({accessToken});
};

// Protected route function (example)
exports.protectedRoute = async (req, res) => {
    // Access protected resource
    res.json({message: 'Protected resource accessed successfully'});
};

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!authHeader || !token) {
        return res.status(401).json({error: 'Access token is missing'});
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({error: 'Access token is invalid'});
    }
    next();
}