const axios = require("axios")
const redisClient = require("../helpers/redis");
const userSearches = require("../models/city.model");
require("dotenv").config();

const getlocationData = async(req,res)=>{

    try {
        const city = req.params.city || req.body.city;
        console.log(city)
        const cityincache = await redisClient.get(city)
        if(cityincache) return res.status(200).send({data:cityincache})

        const citydata  = await axios.get(`https://ipapi.co/8.8.8.8/${city}`)
        const result = citydata.data;

        redisClient.set(city,JSON.stringify(result));

        await userSearches.findOneAndUpdate({userId:req.body.userId},{
            userId:req.body.userId, $push: {searchHistory:city}
        },{new:true,upsert:true,setDefaultsOnInsert:true}
        )
        return res.send({data:result})
    } catch (err) {
        return res.send(err.message)
    }
}

module.exports = {getlocationData}


