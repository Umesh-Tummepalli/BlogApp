import React from 'react';
import PropTypes from 'prop-types';
import { UploadCloud, X } from 'lucide-react';

const Video = React.memo(({ value, handleInputChange, index }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleInputChange(index, file);
    }
  };

  const handleRemoveVideo = () => {
    handleInputChange(index, null);
  };

  const inputId = `video-input-${index}`;

  let videoSrc = null;
  if (value instanceof File) {
    videoSrc = URL.createObjectURL(value);
  }

  return (
    <div className="w-full">
      {videoSrc ? (
        <div className="relative group aspect-video bg-black/20 rounded-lg overflow-hidden">
          <video
            src={videoSrc}
            controls
            controlsList="nodownload"
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleRemoveVideo}
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
              <span className="font-semibold">Click to upload video</span>
            </p>
            <p className="text-xs">MP4, WEBM, or OGG</p>
          </div>
        </label>
      )}
      <input
        type="file"
        id={inputId}
        className="hidden"
        accept="video/*"
        onChange={handleFileChange}
      />
    </div>
  );
});

Video.propTypes = {
  value: PropTypes.instanceOf(File),
  handleInputChange: PropTypes.func.isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Video.defaultProps = {
  value: null,
};

export default Video;
