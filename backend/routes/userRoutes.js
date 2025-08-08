import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import user from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email, dob, contactNumber } = req.body;
  if (!username || !password || !email || !dob || !contactNumber) {
    return res
      .status(400)
      .json({ success: false, message: "Insufficent Data" });
  }
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
  } catch (err) {
    console.log("Error in fetching user", err.message);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }

  try {
    const salt = await bcrypt.genSalt(11);
    const hash = await bcrypt.hash(password, salt);

    const userObj = {
      username,
      email,
      dateOfBirth: dob,
      contactNumber,
      password: hash,
    };
    const newuser = new userModel(userObj);
    await newuser.save();
    return res
      .status(200)
      .json({ success: true, message: "Registered Sucessfully" });
  } catch (err) {
    console.log("Error in database upload", err.message);
    return res.status(500).json({ success: true, message: "Server error" });
  }
});


router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({success:false,message:"Insufficient Data"});
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        const hashPass=user.password;
        const compare = await bcrypt.compare(password,hashPass);
        if(!compare){
            return res.status(401).json({success:false,message:"Invalid Credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.cookie('token',token,{
            maxAge:60*60*1000,
            httpOnly:true,
            sameSite:'lax'
        })
        res.status(200).json({success:true,message:'Login Success'});
    }
    catch(err){
        console.log("Error in fetching user",err.message);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
})

router.delete('/logout',async (req,res)=>{
    res.clearCookie('token');
    return res.status(200).json({success:true,message:'Logged Out Sucessful'});
})

export default router;
