const { DataTypes } = require("sequelize")
const sequelize = require("../db")

const options = sequelize.define(
    'Options',
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pollId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
)

module.exports = options