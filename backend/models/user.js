import mongoose from "mongoose";

const userModel= new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        unique: true
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit contact number"]
    },
    bio:{
        type:String,
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
})

const user = mongoose.models.User || mongoose.model("User", userModel);
export default user;