import express from 'express'

const app = express();

app.use(express.json());

app.get("/polls", async(req, res, next) => {
    try{
     const polls = await polls.findAll()
     res.json(polls)   
    } catch(error){
        next(error)
        
    }    
});

// app.post("/polls", async(res, req) => {
// })

app.listen(8080, () => console.log("Server running on port 8080"));