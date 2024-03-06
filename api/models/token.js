const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    return sequelize.define('Token', {
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};
