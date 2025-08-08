import React, { useState, useEffect,useRef } from "react";
import AddBlogToolBar from "./AddBlogToolBar";
import { v4 as uuid } from 'uuid';
import EditableComponets from "./EditableComponets";

const WriteBlog = ({ blogdata, setBlogData }) => {
  const titleRef = useRef(null);
  const categories = [
    "Technology",
    "Design",
    "Lifestyle",
    "Travel",
    "Food",
    "Business",
    "Health",
    "Education",
    "All"
  ];

  function handleAddBlogEl(type) {
    const newContents = [...blogdata.contents];
    const id = uuid();
    const blogObject = {
      id,
      type,
      data: "",
    };
    newContents.push(blogObject);
    setBlogData({ ...blogdata, contents: newContents });
  }

  function handleInputChange(index, value) {
    const newContents = [...blogdata.contents];
    newContents[index].data = value;
    setBlogData({ ...blogdata, contents: newContents });
  }

  function handleDelete(index) {
    const newContents = [...blogdata.contents];
    newContents.splice(index, 1);
    setBlogData({ ...blogdata, contents: newContents });
  }

  // Auto-resize the textarea when the title changes
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [blogdata.title]);

  return (
    <div className="bg-[#242424] p-8 rounded-lg border border-gray-700 max-w-4xl mx-auto mb-12">
      <label
        htmlFor="thumbnailUpload"
        className="border-2 border-dashed rounded-lg border-gray-600 p-4 block h-[300px] w-full mb-8 cursor-pointer"
      >
        {blogdata.thumbnail ? (
          <img
            src={URL.createObjectURL(blogdata.thumbnail)}
            alt="Thumbnail"
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <h3 className="text-2xl font-bold text-gray-400">
              Upload Thumbnail
            </h3>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          id="thumbnailUpload"
          onChange={(e) =>
            setBlogData({ ...blogdata, thumbnail: e.target.files[0] })
          }
        />
      </label>
      <textarea
        ref={titleRef}
        placeholder="Blog Title"
        className="bg-transparent text-4xl font-bold placeholder-gray-500 text-white outline-none w-full mb-4 resize-none overflow-hidden"
        value={blogdata.title}
        onChange={(e) => setBlogData({ ...blogdata, title: e.target.value })}
        rows={1}
      />
      <div className="relative mb-8">
        <label htmlFor="category" className="sr-only">
          Category
        </label>
        <select
          id="category"
          value={blogdata.category}
          onChange={(e) => setBlogData({ ...blogdata, category: e.target.value })}
          className="w-full  text-white rounded-lg p-3 outline-1 outline-[#6a7282] focus:outline-1 appearance-none bg-[#242424]"
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <EditableComponets contents={blogdata.contents} handleInputChange={handleInputChange} handleDelete={handleDelete} />
      <AddBlogToolBar handleAddBlogEl={handleAddBlogEl} />
    </div>
  );
};

export default WriteBlog;