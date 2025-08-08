import React, { useRef, useState, useEffect } from 'react';

const Heading = ({ handleInputChange, index, value }) => {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef();

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleInputChange(index, newValue);
    }, 500);
  };

  return (
    <input
      type="text"
      placeholder="Heading"
      className="text-3xl font-bold bg-transparent text-white placeholder-gray-500 outline-none w-full resize-none"
      onChange={handleChange}
      value={localValue}
    />
  );
};

export default Heading;