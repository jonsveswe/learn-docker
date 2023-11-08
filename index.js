const express = require("express");
const mongoose = require("mongoose");
const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET} = require("./config/config.js");
console.log(MONGO_USER);
console.log(MONGO_PASSWORD);
console.log(MONGO_IP);
console.log(MONGO_PORT);
console.log(REDIS_URL);
console.log(REDIS_PORT);
console.log(SESSION_SECRET);

const cors = require("cors");

const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;
let redisClient = redis.createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT,
    }  
});
redisClient.connect().then(()=>console.log(`succesfullyy connected to redis`)).catch(console.error);

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Use the container name "mongo" to talk to it instead of hardcoding IP adress since that can change between restarts.
// Docker uses DNS to translate beetwen name and IP. 
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
    .connect(mongoURL)
    .then(()=>console.log(`User ${MONGO_USER} succesfullyy connected to Mongo DB`))
    .catch(((error)=>{
        console.log("User: ", MONGO_USER);
        console.log(error);
    }));

app.enable("trust proxy");// nginx adds stuff into the header.
app.use(cors({}));

app.use(session({
    store: new RedisStore({client:redisClient}),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true, // if false it doesn't work for me. 
    cookie:{
        secure: false,
        httpOnly: true,
        maxAge: 30000, // ms
    }
})); 
    
// Middleware to make sure the body gets attached to the request object. 
app.use(express.json());

app.get("/api/v1", (req, res)=>{
    res.send("<h2>Hi There!!</h2>");
    console.log("Yeah it ran.");// log something to see that nginx is load balancing requests. 
});

//localhost:3000/api/v1/post/
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`listening on port ${port}`));