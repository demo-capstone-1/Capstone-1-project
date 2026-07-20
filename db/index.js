const db = require("../db")
const Polls = require("./poll")
const Options = require("./poll")
const Votes = require("./poll")

Polls.hasMany(Options)
Options.hasMany(Votes)
Votes.belongsTo(Options)
Options.belongsTo(Polls)



module.exports = {
    db,
    Polls,
    Options,
    Votes,
};



