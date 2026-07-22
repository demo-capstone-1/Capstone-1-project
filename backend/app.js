const express = require("express");
const cors = require("cors");
const { sequelize, db } = require("./models");
const { Poll } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.use(require("./routes/poll"));

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({error: "Something went wrong"})
})

const PORT = process.env.PORT || 8080;

const server = async () => {
  await db
    .sync({ alter: true })
    .then(() => {
      console.log("Database is synced");
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("Failed to sync database:", err));
};

server();
