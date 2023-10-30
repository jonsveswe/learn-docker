const express = require("express");
const mongoose = require("mongoose");
const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT} = require("./config/config.js");
const postRouter = require("./routes/postRoutes");

const app = express();

// Use the container name "mongo" to talk to it instead of hardcoding IP adress since that can change between restarts.
// Docker uses DNS to translate beetwen name and IP. 
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
    .connect(mongoURL)
    .then(()=>console.log(`User ${MONGO_USER} succesfullyy connected to DB`))
    .catch(((error)=>{
        console.log("User: ", MONGO_USER);
        console.log(error);
    }));

// Middleware to make sure the body gets attached to the request object. 
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("<h2>Hi There!!</h2>");
});

//localhost:3000/api/v1/post/
app.use("/api/v1/posts", postRouter);
const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`listening on port ${port}`));