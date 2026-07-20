const sequelize = require("./db")

async function testDatabase(){
 try{
    await sequelize.authenticate()
    console.log("Database has connected!")
 }catch(error){
    console.error("Unable to connect:", error)
 }
}

testDatabase()