const mongoose = require("mongoose")
// import mongoose from "mongoose";
mongoose.connect("mongodb+srv://prakashhalwai59:prakash123@cluster0.dlz75bp.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('Database Connected Sucessfull');
    })
    .catch((e) => {
        console.log(e);
    })

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number:{
        type: String
    },
    Emailsubject: {
        type: String,
    }, 
    Massage:
    {
        type: String,
    }
})

const LogInCollection = new mongoose.model('users', logInSchema)

module.exports = LogInCollection