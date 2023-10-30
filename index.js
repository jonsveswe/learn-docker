const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Use the container name "mongo" to talk to it instead of hardcoding IP adress since that can change between restarts.
// Docker uses DNS to translate beetwen name and IP. 
mongoose.connect("mongodb://jonas:1234@mongo/?authSource=admin")
    .then(()=>console.log("Succesfullyy connected to DB"))
    .catch(((error)=>console.log(error)));

app.get("/", (req, res)=>{
    res.send("<h2>Hi There!!</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`listening on port ${port}`));