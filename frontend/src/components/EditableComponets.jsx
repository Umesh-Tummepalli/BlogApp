import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Heading from './InputComponents/Heading';
import Text from './InputComponents/Text';
import Image from './InputComponents/Image';
import Code from './InputComponents/Code';
import Video from './InputComponents/Video';
import { Trash } from 'lucide-react';

// 1. Define animation variants for the container and list items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Stagger the children's animations by 0.1 seconds
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  // Items will start off-screen to the left and faded out
  hidden: { x: -50, opacity: 0 },
  // Animate to their final position and fade in
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }, // A little spring bounce
  },
  // On exit, shrink and fade out
  exit: {
    x: -300, // Slide out to the left
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const EditableComponets = ({ contents, handleDelete, handleInputChange }) => {
  function renderComponent(type, data, index) {
    switch (type) {
      case 'heading':
        return <Heading value={data} handleInputChange={handleInputChange} index={index} />;
      case 'text':
        return <Text value={data} handleInputChange={handleInputChange} index={index} />;
      case 'img':
        // Renamed to match the component file name from the previous example
        return <Image value={data} handleInputChange={handleInputChange} index={index} />;
      case 'video':
        // Renamed to match the component file name from the previous example
        return <Video value={data} handleInputChange={handleInputChange} index={index} />;
      default:
        return null;
    }
  }

  return (
    // 2. Apply the container variants to the list wrapper
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4" // Adds space between items
    >
      <AnimatePresence>
        {contents.map((item, index) => (
          <motion.div
            key={item.id} // The key is essential for AnimatePresence
            variants={itemVariants} // 3. Apply item variants here
            exit="exit" // Specify the exit variant
            layout // Smoothly animates re-ordering of other items
            className="flex gap-4 group items-center p-2 rounded-lg"
          >
            <button
              className="p-3 rounded-full border border-transparent opacity-30 group-hover:opacity-100 group-hover:bg-gray-100 transition-all"
              onClick={() => {
                handleDelete(index);
              }}
            >
              <Trash className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex-grow">
              {renderComponent(item.type, item.data, index)}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default EditableComponets;