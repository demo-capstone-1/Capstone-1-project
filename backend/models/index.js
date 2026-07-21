const sequelize = require("../db") // Database Connection
const Poll = require("./poll")
const Option = require("./options")
const Vote = require("./votes")

// Association

Poll.hasMany(Option, {
    foreignKey: 'pollId',
    as: 'options',
    onDelete: 'CASCADE',
});

Option.belongsTo(Poll, {
    foreignKey: 'pollId',
    as: 'poll'
});

Option.hasMany(Vote, {
   foreignKey: 'optionId',
   as: 'votes',
   onDelete: 'CASCADE',
});

Vote.belongsTo(Option, {
    foreignKey: 'optionId',
    as: 'option',
});

module.exports = {
    sequelize,
    Poll,
    Option,
    Vote
};

