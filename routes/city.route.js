const express = require("express");
const {authenticate }= require("../middlewares/auth");
const { getlocationData } = require("../controllers/city.controller");

const cityRouter = express.Router();

cityRouter.get("/getlocationdata",authenticate,getlocationData)

module.exports = {cityRouter}