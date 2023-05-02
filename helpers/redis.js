const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("connect",async()=>{
    console.log("Connected to the Redis")
})
redisClient.on("error",(err)=>{
    console.log("Couldn't connect to the Redis")
})

redisClient.connect();

module.exports = redisClient;