const bcrypt = require('bcrypt');
const {User}  = require('../db');

async function createUser(req, res) {
    try {
        // Extract user data from the request body
        const { userName, firstName, lastName, password } = req.body;
        // Validate incoming data
        if (!userName || !password || !firstName || !lastName) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in the database
        const newUser = await User.create({
            userName,
            password: hashedPassword,
            firstName,
            lastName,
            status:true
        });

        // Return the newly created user object in the response
        res.status(201).json(newUser);
    } catch (error) {
        // Handle any errors that occur during user creation
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

module.exports = {
    createUser
};