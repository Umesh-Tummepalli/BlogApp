import React from "react";
import { Type, Image, Heading, Code, Plus, Video } from "lucide-react";

const AddBlogToolBar = ({ handleAddBlogEl }) => {
  const buttonClasses = "p-3 rounded-full text-gray-400 bg-[#242424] border border-gray-700 hover:bg-gradient-to-r from-purple-400 to-pink-600 hover:text-white transition-all duration-200";

  return (
    <div className="my-8">
        <div className="flex items-center justify-center">
            <div className="group relative flex items-center justify-center">
                <div className="absolute flex items-center gap-4 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-x-full group-hover:-mr-12">
                    <button className={buttonClasses} onClick={() => handleAddBlogEl("heading")}>
                        <Heading size={20} />
                    </button>
                    <button className={buttonClasses} onClick={() => handleAddBlogEl("text")}>
                        <Type size={20} />
                    </button>
                </div>

                <button className={`${buttonClasses} z-10 group-hover:rotate-45`}>
                    <Plus size={24} />
                </button>

                <div className="absolute flex items-center gap-4 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1/2 group-hover:ml-12">
                    <button className={buttonClasses} onClick={() => handleAddBlogEl("img")}>
                        <Image size={20} />
                    </button>
                    <button className={buttonClasses} onClick={() => handleAddBlogEl("video")}>
                        <Video size={20} />
                    </button>
                     <button className={buttonClasses} onClick={() => handleAddBlogEl("code")}>
                        <Code size={20} />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AddBlogToolBar;
