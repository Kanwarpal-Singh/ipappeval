const mongoose = require("mongoose");
const userCities = mongoose.Schema({
    userId: {type:mongoose.Types.ObjectId,required:true},
    searchHistory: [{type:String,required:true}]
})

const userSearches = mongoose.model("cities",userCities)

module.exports = userSearches;