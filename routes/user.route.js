const express = require("express")
const {signup,login,logout} = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/signup",signup)
userRouter.post("/login",login);
userRouter.get("/logout",authenticate,logout)

module.exports = userRouter