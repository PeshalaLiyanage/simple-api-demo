// models/Todo.js
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    return sequelize.define('Todo', {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
};
