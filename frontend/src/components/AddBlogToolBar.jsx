import React from "react";
import { TypeOutline, Image, Heading, Code,Plus,Video } from "lucide-react";
const AddBlogToolBar = ({ handleAddBlogEl }) => {
  return (
    <div className="group flex gap-1 w-fit py-3">
        <button className="p-2 mx-1 rounded-full  cursor-pointer border-1">
            <Plus />
        </button>
      <div className="flex gap-2 justify-start scale-x-0 duration-100  group-hover:scale-x-100 origin-left border-l-3 pl-1">
        <button
          className="p-2 mx-1 rounded-full hover:bg-[] cursor-pointer border-1  hover:bg-[#383838]"
          onClick={() => {
            handleAddBlogEl("heading");
          }}
        >
          <Heading strokeWidth={2.25} />
        </button>
        <button
          className="p-2 mx-1 rounded-full hover:bg-[] cursor-pointer border-1 hover:bg-[#383838]"
          onClick={() => {
            handleAddBlogEl("text");
          }}
        >
          <TypeOutline />
        </button>
        <button
          className="p-2 mx-1 rounded-full hover:bg-[] cursor-pointer border-1 hover:bg-[#383838]"
          onClick={() => {
            handleAddBlogEl("img");
          }}
        >
          <Image strokeWidth={2.25} />
        </button>
        <button
          className="p-2 mx-1 rounded-full hover:bg-[] cursor-pointer border-1 hover:bg-[#383838]"
          onClick={() => {
            handleAddBlogEl("video");
          }}
        >
          <Video />
        </button>
      </div>
    </div>
  );
};

export default AddBlogToolBar;
