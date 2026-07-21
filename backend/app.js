const express = require("express");
const cors = require("cors");
const { sequelize, db } = require("./models");
const { Poll } = require("./models");

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.Router)

const PORT = process.env.PORT || 8080;

app.get("/polls", async (req, res, next) => {
    try{
        const Polls = await Poll.findAll()
        res.json(Polls)
    }catch(err){
        next(err)
    }
});

app.post("/polls", async (req, res, next) => {
    try{
        const { title, description }  = req.body;
    
        const newPoll = await Poll.create({
            title,
            description,
        });
        res.status(201).json(newPoll);
    }catch(err){
        next(err)
    }
})

db.sync({alter: true })
    .then(() => {
        console.log("Database is synced");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch((err) => console.error("Failed to sync database:", err));