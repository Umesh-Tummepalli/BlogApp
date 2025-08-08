import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Heading from './InputComponents/Heading';
import Text from './InputComponents/Text';
import Image from './InputComponents/Image';
import Code from './InputComponents/Code';
import Video from './InputComponents/Video';
import { Trash } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
  exit: {
    x: 300, 
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
        return <Image value={data} handleInputChange={handleInputChange} index={index} />;
      case 'video':
        return <Video value={data} handleInputChange={handleInputChange} index={index} />;
      case 'code':
        return <Code value={data} handleInputChange={handleInputChange} index={index} />;
      default:
        return null;
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <AnimatePresence>
        {contents.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            exit="exit"
            layout
            className="flex gap-4 group items-start p-4 rounded-lg border border-gray-700 bg-[#191919] hover:border-gray-600 transition-colors"
          >
            <div className="flex-grow">
              {renderComponent(item.type, item.data, index)}
            </div>
            <button
              className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-red-500/20 transition-all opacity-50 group-hover:opacity-100"
              onClick={() => handleDelete(index)}
            >
              <Trash className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default EditableComponets;