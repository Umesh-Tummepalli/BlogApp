import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component for uploading and previewing a single image file.
 * It handles image preview, selection, and removal.
 *
 * @param {object} props - The component props.
 * @param {File} props.value - The selected image File object (or null).
 * @param {Function} props.handleInputChange - Callback function to update the file in the parent state.
 * @param {number|string} props.index - A unique index for the component instance.
 */
const ImageUploader = React.memo(({ value, handleInputChange, index }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleInputChange(index, file);
    }
  };

  const handleRemoveImage = () => {
    handleInputChange(index, null);
  };

  const inputId = `image-input-${index}`;

  // Use value directly for preview
  let imageSrc = null;
  if (value instanceof File) {
    imageSrc = URL.createObjectURL(value);
  }

  return (
    <div className="w-full max-w-sm font-sans">
      {imageSrc ? (
        <div className="relative group aspect-square">
          <img
            src={imageSrc}
            alt="Selected preview"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <div className="absolute top-2 right-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <label
              htmlFor={inputId}
              className="bg-gray-800 bg-opacity-70 text-white text-xs font-semibold px-3 py-1.5 rounded-md cursor-pointer hover:bg-opacity-90"
            >
              Change
            </label>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-600 bg-opacity-80 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-opacity-100"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex flex-col items-center justify-center text-center p-4">
            <svg className="w-10 h-10 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload image</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or GIF</p>
          </div>
        </label>
      )}
      <input
        type="file"
        id={inputId}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
});

// ✨ PropTypes ensure the component receives the correct props.
ImageUploader.propTypes = {
  value: PropTypes.instanceOf(File),
  handleInputChange: PropTypes.func.isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// Set a default value for the `value` prop to prevent errors.
ImageUploader.defaultProps = {
  value: null,
};

export default ImageUploader;