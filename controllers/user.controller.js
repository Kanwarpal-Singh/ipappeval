const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const redisClient = require("../helpers/redis");
require("dotenv").config();

const signup = async(req,res)=>{
    try {
        const {name,email,pass,city} = req.body;
        const userexist =await userModel.findOne({email})
        if(userexist){
            console.log("You already have an account! please Login")
            return res.send("You already have an account! please Login")
        }else{
            bcrypt.hash(pass,5,async(err,hashed_pass)=>{
                if(err){
                    return res.status(401).send(err.message)
                }else{
                    const user = new userModel({name,email,pass:hashed_pass,city})
                    await user.save()
                    console.log(`Welcome Mr. ${user.name}, you have been successfully signed up`)
                    return res.status(200).send(`Welcome Mr. ${user.name}, you have been successfully signed up`)
                }
            })
        }
    } catch (err) {
        res.send(err.message)
    }
}

const login = async(req,res)=>{
    const {email,pass} = req.body;
    try {
        const user = await userModel.findOne({email});
        console.log(user)
        if(!user){
            console.log("User not found, Please signup first!")
            return res.send("User not found, Please signup first!")
        }else{
            await bcrypt.compare(pass,user.pass,async(err,result)=>{
                if(result){
                    const token = jwt.sign({userId:user._id,city:user.city},process.env.JWT_SECRET)
                    return res.send({message:"Login Succesful",token})
                }else{
                    console.log("Invalid Credentials")
                    return res.send(err.message)
                }
            })
        }
        
    } catch (err) {
        return res.send(err.message)
    }
}


const logout = async(req,res)=>{
    try {
        // const token = req.headers?.authorization?.split(" ")[1]
        const token = req.headers.authorization
        const userId = req.body.userId
        console.log(token)
        
        if(token.length===0){
            console.log("token user not found")
            return res.status(401)
        }
        // console.log(redisClient)
        await redisClient.set(userId,token)
        res.send("Logout Successfull")
    } catch (err) {
        return res.send(err.message)
    }
}


module.exports = {signup,login,logout}