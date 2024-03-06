// routes/index.js

const express = require('express');
const {getAllTodos} = require('../controllers/todoController')
const {login, refreshToken, authenticateToken} = require('../controllers/authController');
const {createUser} = require('../controllers/userController');

const router = express.Router();

// call the controller functions
router.get('/todo', authenticateToken, getAllTodos);
router.post('/user',createUser);

router.post('/login', login); // Login route
router.post('/refresh-token', refreshToken); // Refresh token route

module.exports = router;
