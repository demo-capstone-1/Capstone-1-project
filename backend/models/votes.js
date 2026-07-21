const { DataTypes } = require("sequelize")
const sequelize = require("../db")

const Votes = sequelize.define(
    'Votes',
    {
        optionId: {
            type:DataTypes.INTEGER,
            allowNull: true,
        },
    }
)

module.exports = Votes