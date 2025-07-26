import React, { useRef, useState, useEffect } from 'react';

const Heading = ({ handleInputChange, index, value }) => {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef();

  // Keep localValue in sync if value prop changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue); // Immediate feedback
    clearTimeout(timeoutRef.current); // Clear old timeout
    timeoutRef.current = setTimeout(() => {
      handleInputChange(index, newValue); // Update global state after 500ms pause
    }, 500);
  };

  return (
    <input
      type="text"
      placeholder="Heading"
      className="text-2xl p-2 outline-0 w-full"
      onChange={handleChange}
      value={localValue}
    />
  );
};

export default Heading;
