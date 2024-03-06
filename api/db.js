// database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST
});

const User = require('./models/User')(sequelize);
const Todo = require('./models/Todo')(sequelize);
const Token = require('./models/Token')(sequelize);

// Define associations between models
User.hasMany(Todo);
Todo.belongsTo(User);
User.hasOne(Todo);
Token.belongsTo(User);

try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Sync the models with the database
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

module.exports = { sequelize, User, Todo };
