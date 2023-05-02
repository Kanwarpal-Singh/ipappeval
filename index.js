const express = require("express");
const {connection} = require("./config/db")
const userRouter = require("./routes/user.route");
const { cityRouter } = require("./routes/city.route");
require("dotenv").config()

const port = process.env.PORT || 1400

const app = express();
app.use(express.json())
app.use("/users",userRouter)
app.use("/city",cityRouter)

app.listen(port,async()=>{
    try {
        await connection
        console.log("Connected to the Databse")
    } catch (err) {
        console.log("Couldn't connect to the Database",err.message)
    }
    console.log(`Server is running at PORT ${port}`)
})