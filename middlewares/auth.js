const jwt = require("jsonwebtoken");
require("dotenv").config();
const redisClient = require("../helpers/redis");

const authenticate = async(req,res,next)=>{
    try {
       const token = req.headers.authorization;
    if(!token) return res.status(401).send("Please Login again")

    const validtoken = await jwt.verify(token,process.env.JWT_SECRET)
    if(!validtoken) return res.send("authentication failed, login again!");

    const tokenblacklisted = await redisClient.get(token)
    if(tokenblacklisted)  return res.send("Unauthorized");

    req.body.userId = validtoken.userId;
    req.body.city = validtoken.city;
    next() 
    } catch (err) {
        res.send(err.message)
    }
    
}

module.exports = {authenticate}