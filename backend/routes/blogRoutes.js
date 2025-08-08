import express from "express";
import blogModel from "../models/blog.js";
import upload from "../config/multer.js";
import userAuth from "../auth/userAuth.js";
import { v2 as cloudinary } from "cloudinary";
const router = express.Router();

router.post(
  "/",
  userAuth,
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
    },
    {
      name: "videos",
    },
  ]),
  async (req, res) => {
    const { title, category } = req.body;
    const { thumbnail } = req.files;
    const { images, videos } = req.files;
    if (!title || !category || !thumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient Data" });
    }
    const contents = JSON.parse(req.body.contents);
    const publicId = [];
    try {
      const cloudRes = await cloudinary.uploader.upload(thumbnail?.[0]?.path, {
        resource_type: "image",
      });
      contents.thumbnail = cloudRes.secure_url;
      publicId.push(cloudRes.public_id);
    } catch (err) {
      console.log("Error in uploading thumbnail", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    const imageUrl = [];
    const videoUrl = [];
    try {
      if (images) {
        for (const image of images) {
          const res = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
          });
          imageUrl.push(res.secure_url);
          publicId.push(res.public_id);
        }
      }
      if (videos) {
        for (const video of videos) {
          const res = await cloudinary.uploader.upload(video.path, {
            resource_type: "video",
          });
          videoUrl.push(res.secure_url);
          publicId.push(res.public_id);
        }
      }
    } catch (err) {
      console.log("Error in uploading images/videos", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    let imgCnt = 0,
      vidCnt = 0;
    for (const item of contents) {
      if (item.type === "img") {
        item.data = imageUrl?.[imgCnt++];
      }
      if (item.type === "video") {
        item.data = videoUrl?.[vidCnt++];
      }
    }
    const blogObject = {
      authorId: req.user._id,
      title,
      category,
      blog: contents,
      thumbnail: contents.thumbnail,
      cloudinaryPublicIds: publicId,
      authorName: req.user.username,
    };
    try {
      const newBlog = new blogModel(blogObject);
      await newBlog.save();
      return res
        .status(201)
        .json({ success: true, message: "blog uploaded successfully" });
    } catch (err) {
      console.log("Error in saving blog", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

router.get("/user/", userAuth, async (req, res) => {
  const uid = req.user._id;
  try {
    const userBlogs = await blogModel.find(
      { authorId: uid },
      {
        title: 1,
        thumbnail: 1,
        category: 1,
        updatedAt: 1,
        views: 1,
        readTime: 1,
        likes: 1,
      }
    );
    return res.status(200).json({ success: true, data: userBlogs });
  } catch (Err) {
    console.log("Error in fetching user blogs", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    console.log("Error in fetching blog", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});
export default router;
