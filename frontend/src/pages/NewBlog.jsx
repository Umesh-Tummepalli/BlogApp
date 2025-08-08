import React, { useState } from "react";
import WriteBlog from "../components/WriteBlog";
import axios from "axios";
import { toast } from "react-toastify";
const NewBlog = () => {
  const [blogdata, setBlogData] = useState({
    title: "",
    thumbnail: "",
    category: "",
    contents: [],
  });
  async function handleSubmit() {
    const { contents } = blogdata;
    const images = [];
    const videos = [];
    for (const item of contents) {
      if (item.type === "img") {
        images.push(item.data);
      } else if (item.type === "video") {
        videos.push(item.data);
      }
    }
    const formData = new FormData();
    formData.append("title", blogdata.title);
    formData.append("category", blogdata.category);
    formData.append("thumbnail", blogdata.thumbnail);
    for (const image of images) {
      formData.append("images", image);
    }
    for (const video of videos) {
      formData.append("videos", video);
    }
    formData.append("contents", JSON.stringify(contents));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success(res?.data?.message);
      setBlogData({
        title: "",
        thumbnail: "",
        category: "",
        contents: [],
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className="min-h-screen bg-[#191919] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Create a New{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Blog Post
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Share your thoughts and ideas with the community.
          </p>
        </div>
        <WriteBlog blogdata={blogdata} setBlogData={setBlogData} />
        <div className="bg-[#242424] rounded-md p-3 text-center m-auto w-1/2 flex">
          <button
            className="text-xl p-3 bg-white rounded-md text-black text-center font-bold hover:bg-gradient-to-r from-purple-400 to-pink-600 hover:text-white duration-200"
            onClick={handleSubmit}
          >
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
