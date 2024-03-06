// routes/index.js

const express = require('express');
const userRoutes = require('./userRoutes');
const todoController = require('../controllers/todoController')
const {login, refreshToken, authenticateToken} = require('../controllers/authController');

const router = express.Router();

// call the controller functions
router.get('/todo', authenticateToken, todoController.getAllTodos);
router.use('/user',authenticateToken, userRoutes);

router.post('/login', login); // Login route
router.post('/refresh-token', refreshToken); // Refresh token route


module.exports = router;
