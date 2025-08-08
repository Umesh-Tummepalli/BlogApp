import mongoose from 'mongoose';
import jwt from "jsonwebtoken"
import userModel from '../models/user.js'
async function userAuth(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({success:false,message:'Unauthorized'});
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        const id=decode.id;
        console.log(decode)
        const user=await userModel.findById(id);
        if(!user){
            return res.status(404).json({success:false,message:'user not found'});
        }
        req.user=user;
        next();
    }
    catch(err){
        return res.status(401).json({success:false,message:'Unauthorized'});
    }
}

export default userAuth;