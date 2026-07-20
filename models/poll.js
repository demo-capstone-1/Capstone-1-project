const{ DataTypes } = require('sequelize')
const sequelize = require("../db")

const poll = sequelize.define(
    'Poll',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
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
    },
    'Votes',
    {
        optionId: {
            type:DataTypes.INTEGER,
            allowNull: true,
        },
    },
)
module.exports = poll;