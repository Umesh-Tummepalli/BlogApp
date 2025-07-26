import React, { useState,useEffect } from "react";
import AddBlogToolBar from "./AddBlogToolBar";
import {v4 as uuid} from 'uuid'
import EditableComponets from "./EditableComponets";
const WriteBlog = () => {
  const [blogdata, setBlogData] = useState({
    title: "",
    thumbnail: "",
    contents: [],
  });
  function handleAddBlogEl(type) {
    const blogData = blogdata.contents;
    const id=uuid();
    const blogObject = {
      id,
      type,
      data: "",
    };
    blogData.push(blogObject);
    setBlogData({ ...blogdata, contents: blogData });
  }
  function handleInputChange(index,value){
    const blogData=blogdata.contents;
    blogData[index].data=value;
    setBlogData({...blogdata,contents:blogData}); 
  }
  function handleDelete(index){
    const blogData=blogdata.contents;
    blogData.splice(index,1);
    setBlogData({...blogdata,contents:blogData});
  }
  useEffect(()=>{
    console.log(blogdata);
  },[blogdata]) 
  return (
      <div className="font-['Poppins']  relative w-fit m-auto mb-52">
        <h1 className="text-5xl m-3 p-3 font-extrabold uppercase font-mono">
          New Blog
        </h1>
        <label
          htmlFor="thumbnailUpload"
          className="border-1 border-dashed rounded-lg border-[#d4d4d4] m-3 p-4 block  h-[300px] w-[50vw] "
        >
          {blogdata.thumbnail ? (
            <img
              src={URL.createObjectURL(blogdata.thumbnail)}
              alt=""
              className="w-full  h-full object-cover"
            />
          ) : (
            <h3 className="text-2xl font-bold relative top-1/2 -translate-y-1/2 text-center">
              Upload Thumbnail
            </h3>
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
          type="text"
          placeholder="Title"
          className="ring-0 rounded-sm m-3 text-3xl p-3 font-bold bg-transparent outline-none w-full"
          value={blogdata.title}
          onChange={(e) => setBlogData({ ...blogdata, title: e.target.value })}
        />
        <EditableComponets contents={blogdata.contents} handleInputChange={handleInputChange} handleDelete={handleDelete}/>
        <AddBlogToolBar handleAddBlogEl={handleAddBlogEl} />
      </div>
  );
};

export default WriteBlog;
