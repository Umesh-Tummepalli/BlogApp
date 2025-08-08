import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    authorName:{
      type:String,
      required:true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
      match: /^https?:\/\/[^\s$.?#].[^\s]*$/i,
    },
    blog: {
      type: Object,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: Number,
      default: 50,
    },
    summary:{
      type:String,
      default:"",
    },
    category: {
      type: String,
      required: true,
    },
    cloudinaryPublicIds:{
      type:[String],
    }
  },
  { timestamps: true }
);

const blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default blog;