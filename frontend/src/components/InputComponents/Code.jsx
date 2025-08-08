import React from 'react';

const Code = ({ value, handleInputChange, index }) => {
  return (
    <textarea
      placeholder="// Your code here..."
      className="w-full bg-[#1e1e1e] text-white font-mono p-4 rounded-md border border-gray-700 focus:ring-2 focus:ring-purple-400 outline-none resize-y"
      value={value}
      onChange={(e) => handleInputChange(index, e.target.value)}
      rows={10}
    />
  );
};

export default Code;
