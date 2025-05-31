const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
// console.log(process.env.MONGOOSE_KEY);
mongoose.connect(process.env.MONGOOSE_KEY);

const userschema = mongoose.Schema({
    name : String,
    email : String
})

module.exports = mongoose.model("user",userschema);