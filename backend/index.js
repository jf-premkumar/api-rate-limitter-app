
const express = require("express");
const app = express();
const cors = require("cors");
const rateLimitter = require("./src/limitter.middleware");
// const redis = require("./src/redis-client.js");

app.use(express.json());
app.use(cors());
app.enable('trust proxy')

app.get("/get_wishes/", rateLimitter(60, 10),  async(req, res) => {
    try{
        res.status(200).send(`Hello goodmorning , requests made: ${req.requests}, TTL = ${req.ttl}`);
    }
    catch(err){
        res.status(500).send("Error occured ", err.message);
    }
});

app.listen(2500, async(req, res) => {
    try{
        // console.log(req.connection.remoteAddress)
        console.log("Port 2500 is listening");
    }
    catch(err){
        console.log("Error occured", err.message);
    }
});