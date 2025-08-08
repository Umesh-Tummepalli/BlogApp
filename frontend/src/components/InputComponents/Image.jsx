import React from 'react';
import PropTypes from 'prop-types';
import { UploadCloud, X } from 'lucide-react';

const Image = React.memo(({ value, handleInputChange, index }) => {
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

  let imageSrc = null;
  if (value instanceof File) {
    imageSrc = URL.createObjectURL(value);
  }

  return (
    <div className="w-full">
      {imageSrc ? (
        <div className="relative group aspect-video bg-black/20 rounded-lg overflow-hidden">
          <img
            src={imageSrc}
            alt="Selected preview"
            className="w-full h-full object-contain"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-500"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-transparent hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex flex-col items-center justify-center text-center p-4 text-gray-400">
            <UploadCloud size={48} className="mb-4" />
            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload image</span>
            </p>
            <p className="text-xs">PNG, JPG or GIF</p>
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

Image.propTypes = {
  value: PropTypes.instanceOf(File),
  handleInputChange: PropTypes.func.isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Image.defaultProps = {
  value: null,
};

export default Image;
