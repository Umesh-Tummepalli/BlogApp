import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    blogId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    comment:{
        typeof:String,
        requuired:true,
    },
},{timestamps:true});

const comments=mongoose.models.comments || mongoose.model('comments',commentSchema);

export default comments;